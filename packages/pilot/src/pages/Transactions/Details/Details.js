/* eslint-disable camelcase */
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import {
  compose,
  isNil,
} from 'ramda'
import moment from 'moment'
import {
  requestDetails,
  receiveDetails,
} from './actions'
import { requestLogout } from '../../Account/actions'

import currencyFormatter from '../../../formatters/decimalCurrency'
import TransactionDetailsContainer from '../../../containers/TransactionDetails'
import installmentTableColumns from '../../../components/RecipientSection/installmentTableColumns'
import getColumnFormatter from '../../../formatters/columnTranslator'
import ManualReview from '../../ManualReview'

const mapStateToProps = ({
  account: {
    client,
    user: {
      permission,
    },
  },
  transactions: { loading, query },
}) => ({
  client,
  loading,
  permission,
  query,
})

const mapDispatchToProps = dispatch => ({
  onRequestDetails: (query) => {
    dispatch(requestDetails(query))
  },

  onReceiveDetails: ({ query }) => {
    dispatch(receiveDetails({ query }))
  },
  onRequestDetailsFail: (error) => {
    dispatch(requestLogout(error))
  },
})

const enhanced = compose(
  translate('transactions'),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)

const copyToClipBoard = (text) => {
  const textarea = document.createElement('textarea')
  textarea.textContent = text

  textarea.style.opacity = 0
  textarea.style.position = 'absolute'

  document.body.appendChild(textarea)
  textarea.select()

  document.execCommand('copy')
  document.body.removeChild(textarea)
}

const getTransactionDetailsLabels = t => ({
  acquirer_name: t('transaction.acquirer_name'),
  acquirer_response_code: t('transaction.acquirer_response_code'),
  antifraud_score: t('transaction.antifraud_score'),
  authorization_code: t('transaction.authorization_code'),
  capture_method: t('transaction.capture_method'),
  nsu: t('transaction.nsu'),
  soft_descriptor: t('transaction.soft_descriptor'),
  subscription_id: t('transaction.subscription_id'),
  tid: t('transaction.tid'),
  title: t('transaction.title'),
})

const getCustomerLabels = t => ({
  name: t('customer.name'),
  document_number: t('customer.document_number'),
  born_at: t('customer.born_at'),
  gender: t('customer.gender'),
  phone: t('customer.phone'),
  email: t('customer.email'),
  zip_code: t('customer.zip_code'),
  street: t('customer.street'),
  number: t('customer.number'),
  complement: t('customer.complement'),
  neighborhood: t('customer.neighborhood'),
  city: t('customer.city'),
  state: t('customer.state'),
  title: t('customer.title'),
})

const getEventsLabels = t => ({
  title: t('events.title'),
})

const getPaymentBoletoLabels = t => ({
  copy: t('copy'),
  due_date: t('boleto.due_date'),
  show: t('boleto.show'),
  title: t('boleto.title'),
})

const getPaymentCardLabels = t => ({
  title: t('credit_card'),
})

const getRiskLevelsLabels = t => ({
  very_low: t('transaction.risk_level.very_low'),
  low: t('transaction.risk_level.low'),
  moderated: t('transaction.risk_level.moderated'),
  high: t('transaction.risk_level.high'),
  very_high: t('transaction.risk_level.very_high'),
})

class TransactionDetails extends Component {
  constructor (props) {
    super(props)
    const { t } = this.props
    const formatColumns = getColumnFormatter(t)
    this.state = {
      customerLabels: getCustomerLabels(t),
      eventsLabels: getEventsLabels(t),
      installmentColumns: formatColumns(installmentTableColumns),
      paymentBoletoLabels: getPaymentBoletoLabels(t),
      paymentCardLabels: getPaymentCardLabels(t),
      riskLevelsLabels: getRiskLevelsLabels(t),
      transactionDetailsLabels: getTransactionDetailsLabels(t),
      result: {
        transaction: {},
      },
      showManualReview: false,
      manualReviewAction: null,
    }

    this.handleAlertDismiss = this.handleAlertDismiss.bind(this)
    this.handleCloseManualReview = this.handleCloseManualReview.bind(this)
    this.handleCopyBoletoUrlClick = this.handleCopyBoletoUrlClick.bind(this)
    this.handleManualReviewApprove = this.handleManualReviewApprove.bind(this)
    this.handleManualReviewRefuse = this.handleManualReviewRefuse.bind(this)
    this.handleShowBoletoClick = this.handleShowBoletoClick.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.requestData = this.requestData.bind(this)
  }

  componentDidMount () {
    const { match: { params: { id } } } = this.props
    this.handleUpdate(id, true)
  }

  componentWillReceiveProps ({ match: { params: { id } } }) {
    this.handleUpdate(id)
  }

  handleUpdate (id, forceUpdate) {
    const { match: { params }, history } = this.props
    if (isNil(id)) {
      history.replace('/transactions')
    } else if (id !== params.id || forceUpdate) {
      this.requestData(id)
    }
  }

  requestData (query) {
    this.props.onRequestDetails({ query })

    return this.props.client
      .transactions
      .details(query)
      .then((result) => {
        this.setState({ result })
        this.props.onReceiveDetails(result)
      })
      .catch((error) => {
        this.props.onRequestDetailsFail(error)
      })
  }

  handleAlertDismiss () {
    const { history } = this.props
    history.push('/')
  }

  handleCopyBoletoUrlClick () {
    const {
      transaction: {
        boleto,
      },
    } = this.state.result
    copyToClipBoard(boleto.barcode)
    // TODO: add a confirmation alert HERE !!!
  }

  handleManualReviewApprove () {
    this.setState({
      showManualReview: true,
      manualReviewAction: 'approve',
    })
  }

  handleManualReviewRefuse () {
    this.setState({
      showManualReview: true,
      manualReviewAction: 'refuse',
    })
  }

  handleCloseManualReview () {
    this.setState({ showManualReview: false })
  }

  handleShowBoletoClick () {
    const {
      transaction: {
        boleto,
      },
    } = this.state.result
    window.open(boleto.url)
  }

  render () {
    const { permission, t } = this.props
    const {
      customerLabels,
      eventsLabels,
      installmentColumns,
      paymentBoletoLabels,
      paymentCardLabels,
      result: {
        transaction,
      },
      riskLevelsLabels,
      transactionDetailsLabels,
      showManualReview,
      manualReviewAction,
    } = this.state

    const {
      captured_at,
      payment = { installments: [] },
      reason_code,
      recipients = [],
    } = transaction

    const alertLabels = {
      chargeback_reason_label: t('alert.chargeback_reason'),
      chargeback_reason: t(`chargeback.code.${reason_code || 'unknown'}`),
      reason_code: t('alert.reason_code', { code: reason_code || '-' }),
      resubmit: t('alert.resubmit'),
    }

    const headerLabels = {
      boletoAmountLabel: t('header.boleto_amount'),
      cardAmountLabel: t('header.card_amount'),
      installmentsLabel: t('header.installment_title'),
      installments: t('header.installment', {
        count: payment.installments,
      }),
      title: t('header.title'),
      statusLabel: t('header.status'),
      approveLabel: t('header.approve'),
      refuseLabel: t('header.refuse'),
    }

    const recipientsLabels = {
      collapseInstallmentTitle: t('recipients.collapsedInstallments'),
      expandInstallmentTitle: t('recipients.expandedInstallments'),
      installmentTotalLabel: t('recipients.amount'),
      liabilitiesLabel: t('recipients.liabilities'),
      netAmountLabel: t('recipients.net_amount'),
      noRecipientLabel: t('recipients.empty'),
      outAmountLabel: t('recipients.out_amount', { symbol: t('currency_symbol') }),
      statusLabel: t('recipients.status'),
      title: t('recipients.title', {
        count: recipients.length,
      }),
      totalRecipientsLabel: t('recipients.total_recipient', {
        count: recipients.length,
      }),
      totalTitle: t('recipients.total_amount'),
    }

    const totalDisplayLabels = {
      captured_at: t('captured_at',
        { date: moment(captured_at).format('L') }
      ),
      currency_symbol: t('currency_symbol'),
      mdr: t('payment.mdr',
        { value: currencyFormatter(payment.mdr_amount || 0) }
      ),
      cost: t('payment.cost',
        { value: currencyFormatter(payment.cost_amount || 0) }
      ),
      net_amount: t('net_amount'),
      out_amount: t('out_amount'),
      paid_amount: t('paid_amount'),
      // receive_date: t('received_at', { date: '01/01/1970' }),
      refund: t('payment.refund',
        { value: currencyFormatter(payment.refund || 0) }
      ),
    }

    return (
      <Fragment>
        <TransactionDetailsContainer
          alertLabels={alertLabels}
          atLabel={t('at')}
          boletoWarningMessage={t('boleto.waiting_payment_warning')}
          customerLabels={customerLabels}
          eventsLabels={eventsLabels}
          headerLabels={headerLabels}
          installmentColumns={installmentColumns}
          metadataTitle={t('metadata')}
          onCopyBoletoUrl={this.handleCopyBoletoUrlClick}
          onManualReviewApprove={this.handleManualReviewApprove}
          onManualReviewRefuse={this.handleManualReviewRefuse}
          onDismissAlert={this.handleAlertDismiss}
          onShowBoleto={this.handleShowBoletoClick}
          paymentBoletoLabels={paymentBoletoLabels}
          paymentCardLabels={paymentCardLabels}
          permissions={{
            manualReview: permission !== 'read_only',
          }}
          recipientsLabels={recipientsLabels}
          riskLevelsLabels={riskLevelsLabels}
          totalDisplayLabels={totalDisplayLabels}
          transaction={transaction}
          transactionDetailsLabels={transactionDetailsLabels}
        />
        {showManualReview &&
          <ManualReview
            action={manualReviewAction}
            isOpen={showManualReview}
            onClose={this.handleCloseManualReview}
            onFinish={() => { this.handleUpdate(transaction.id) }}
            t={t}
            transactionId={transaction.id}
          />}
      </Fragment>
    )
  }
}

TransactionDetails.propTypes = {
  client: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  history: PropTypes.shape({
    push: PropTypes.func,
    replace: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
  }).isRequired,
  onReceiveDetails: PropTypes.func.isRequired,
  onRequestDetails: PropTypes.func.isRequired,
  onRequestDetailsFail: PropTypes.func.isRequired,
  permission: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
}

export default enhanced(TransactionDetails)

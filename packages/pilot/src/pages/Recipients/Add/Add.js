import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'ramda'

import { requestLogout } from '../../Account/actions'
import AddRecipient from '../../../../src/containers/AddRecipient'

const mapStateToProps = (state) => {
  const { account } = state
  const { client, company, user } = account
  const { anticipation_config: anticipationConfig } = company || {}

  let {
    config_anticipation_params: canConfigureAnticipation,
    minimum_delay: minimumAnticipationDelay,
    max_anticipation_days: maximumAnticipationDays,
  } = anticipationConfig || {}

  let { permission: userPermission } = user || {}

  if (canConfigureAnticipation === undefined) {
    canConfigureAnticipation = true
  }

  if (minimumAnticipationDelay === undefined) {
    minimumAnticipationDelay = 15
  }

  if (userPermission === undefined) {
    userPermission = 'admin'
  }

  if (maximumAnticipationDays === undefined) {
    maximumAnticipationDays = 32
  }

  const options = {
    canConfigureAnticipation,
    maximumAnticipationDays,
    minimumAnticipationDelay,
    userPermission,
  }

  return {
    client,
    options,
  }
}

const mapDispatchToProp = ({
  redirectToLoginPage: requestLogout,
})

const enhanced = compose(
  connect(mapStateToProps, mapDispatchToProp),
  translate(),
  withRouter
)

class AddRecipientPage extends Component {
  constructor (props) {
    super(props)

    this.fetchAccounts = this.fetchAccounts.bind(this)
    this.onExit = this.onExit.bind(this)
    this.onLoginAgain = this.onLoginAgain.bind(this)
    this.onViewDetails = this.onViewDetails.bind(this)
    this.submitRecipient = this.submitRecipient.bind(this)
  }

  onExit () {
    this.props.history.replace('/recipients')
  }

  onLoginAgain () {
    this.props.redirectToLoginPage()
  }

  onViewDetails (recipientId) {
    this.props.history.replace(`/recipients/details/${recipientId}`)
  }

  submitRecipient (recipient) {
    const { client, options } = this.props
    return client.recipient.add(recipient, options)
  }

  fetchAccounts (document) {
    return this.props.client.recipient.bankAccount(document)
  }

  render () {
    return (
      <AddRecipient
        fetchAccounts={this.fetchAccounts}
        onExit={this.onExit}
        onLoginAgain={this.onLoginAgain}
        onViewDetails={this.onViewDetails}
        options={this.props.options}
        submitRecipient={this.submitRecipient}
        t={this.props.t}
      />
    )
  }
}

AddRecipientPage.propTypes = {
  client: PropTypes.shape({
    recipient: PropTypes.shape({
      add: PropTypes.func.isRequired,
      bankAccount: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  options: PropTypes.shape({
    canConfigureAnticipation: PropTypes.bool,
    maximumAnticipationDays: PropTypes.number,
    minimumAnticipationDelay: PropTypes.number,
    userPermission: PropTypes.string,
  }).isRequired,
  redirectToLoginPage: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func,
  }).isRequired,
}

export default enhanced(AddRecipientPage)

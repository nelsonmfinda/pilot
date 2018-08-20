import React from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  ModalContent,
  ModalSection,
  ModalTitle,
  Spacing,
  Steps,
} from 'former-kit'
import IconClose from 'emblematic-icons/svg/ClearClose32.svg'
import ErrorIcon from '../../components/TransferError/ErrorIcon.svg'

import CaptureForm from './Form'
import CaptureResult from './Result'

const Capture = ({
  captureAmount,
  isFromCheckout,
  isOpen,
  loading,
  onConfirm,
  onCancel,
  onRetry,
  onViewTransaction,
  stepStatus,
  statusMessage,
  t,
  transaction,
}) => {
  const {
    card: {
      brand_name: cardBrand,
      first_digits: cardFirstDigits,
      last_digits: cardLastDigits,
    },
    customer: {
      email: customerEmail,
      name: customerName,
    },
    payment: {
      authorized_amount: authorizedAmount,
      installments,
    },
  } = transaction

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
    >
      <ModalTitle
        closeIcon={<IconClose height={16} width={16} />}
        onClose={onCancel}
        title={t('pages.capture.title')}
      />
      <ModalContent>
        <ModalSection>
          <Steps
            status={[
              { id: 'confirmation', status: stepStatus.confirmation },
              { id: 'result', status: stepStatus.result },
            ]}
            steps={[
              { id: 'confirmation', title: t('pages.capture.confirmation') },
              { id: 'result', title: t('pages.capture.result') },
            ]}
          />
        </ModalSection>
      </ModalContent>
      <Spacing />
      { stepStatus.result !== 'pending'
        ?
          <CaptureResult
            authorizedAmount={authorizedAmount}
            cardBrand={cardBrand}
            cardFirstDigits={cardFirstDigits}
            cardLastDigits={cardLastDigits}
            customerName={customerName}
            customerEmail={customerEmail}
            image={<ErrorIcon />}
            installments={installments}
            message={t('pages.capture.success')}
            onRetry={onRetry}
            onViewTransaction={onViewTransaction}
            paidAmount={Number(captureAmount)}
            status={stepStatus.result}
            statusMessage={statusMessage}
            t={t}
          />
        :
          <CaptureForm
            authorizedAmount={authorizedAmount}
            captureAmount={captureAmount}
            cardBrand={cardBrand}
            cardFirstDigits={cardFirstDigits}
            cardLastDigits={cardLastDigits}
            customerName={customerName}
            customerEmail={customerEmail}
            disabled={loading}
            isFromCheckout={isFromCheckout}
            installments={installments}
            onConfirm={onConfirm}
            t={t}
          />
      }
    </Modal>
  )
}

const stepStatuses = [
  'current', 'error', 'pending', 'success',
]

Capture.propTypes = {
  captureAmount: PropTypes.string,
  isFromCheckout: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onRetry: PropTypes.func.isRequired,
  onViewTransaction: PropTypes.func.isRequired,
  statusMessage: PropTypes.string,
  stepStatus: PropTypes.shape({
    confirmation: PropTypes.oneOf(stepStatuses),
    result: PropTypes.oneOf(stepStatuses),
  }),
  t: PropTypes.func.isRequired,
  transaction: PropTypes.shape({
    card: PropTypes.shape({
      brand_name: PropTypes.string,
      first_digits: PropTypes.string,
      last_digits: PropTypes.string,
    }),
    customer: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
    }),
    payment: PropTypes.shape({
      authorized_amount: PropTypes.number.isRequired,
      installments: PropTypes.number,
      paid_amount: PropTypes.number.isRequired,
    }),
  }).isRequired,
}

Capture.defaultProps = {
  captureAmount: '0',
  loading: false,
  statusMessage: null,
  stepStatus: {
    confirmation: 'current',
    result: 'pending',
  },
}

export default Capture

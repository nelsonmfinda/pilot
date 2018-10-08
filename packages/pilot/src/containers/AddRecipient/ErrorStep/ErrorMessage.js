import React from 'react'
import PropTypes from 'prop-types'

import style from '../style.css'

const ErrorMessage = ({ t, errorCode }) => {
  let errorMessage = t('pages.add_recipient.fail_create_recipient')

  if (errorCode === 400) {
    errorMessage = t('pages.add_recipient.fail_submit_data')
  }

  if (errorCode === 401 || errorCode === 410) {
    errorMessage = t('pages.add_recipient.expired_session')
  }

  if (errorCode === 403) {
    errorMessage = t('pages.add_recipient.no_permission')
  }

  if (errorCode >= 500) {
    errorMessage = t('pages.add_recipient.server_error')
  }

  return (
    <p className={style.centerText}>
      {errorMessage}
    </p>
  )
}

ErrorMessage.propTypes = {
  errorCode: PropTypes.number,
  t: PropTypes.func.isRequired,
}

ErrorMessage.defaultProps = {
  errorCode: 0,
}

export default ErrorMessage

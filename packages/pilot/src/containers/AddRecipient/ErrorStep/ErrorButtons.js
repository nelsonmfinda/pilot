import React from 'react'
import PropTypes from 'prop-types'
import { Button, Spacing } from 'former-kit'

const ErrorButtons = ({
  errorCode,
  onExit,
  onLoginAgain,
  onTryAgain,
  t,
}) => {
  if (errorCode === 401 || errorCode === 410) {
    return (
      <div>
        <Button fill="gradient" onClick={onLoginAgain}>
          {t('pages.add_recipient.login_again')}
        </Button>
      </div>
    )
  }

  if (errorCode === 403 || errorCode >= 500) {
    return (
      <div>
        <Button fill="gradient" onClick={onExit}>
          {t('pages.add_recipient.exit')}
        </Button>
      </div>
    )
  }

  return (
    <div>
      <Button fill="outline" onClick={onExit}>
        {t('pages.add_recipient.exit')}
      </Button>
      <Spacing size="large" />
      <Button fill="gradient" onClick={onTryAgain}>
        {t('pages.add_recipient.try_again')}
      </Button>
    </div>
  )
}

ErrorButtons.propTypes = {
  errorCode: PropTypes.number,
  onExit: PropTypes.func.isRequired,
  onLoginAgain: PropTypes.func.isRequired,
  onTryAgain: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

ErrorButtons.defaultProps = {
  errorCode: 0,
}

export default ErrorButtons

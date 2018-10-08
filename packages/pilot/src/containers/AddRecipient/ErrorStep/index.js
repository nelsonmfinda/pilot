import React from 'react'
import PropTypes from 'prop-types'
import { CardContent } from 'former-kit'

import ErrorIcon from './ErrorIcon.svg'
import ErrorMessage from './ErrorMessage'
import ErrorButtons from './ErrorButtons'
import style from '../style.css'

const ErrorStep = props => (
  <CardContent className={style.flex}>
    <ErrorIcon />
    <ErrorMessage {...props} />
    <ErrorButtons {...props} />
  </CardContent>
)

ErrorStep.propTypes = {
  errorCode: PropTypes.number,
  onExit: PropTypes.func.isRequired,
  onLoginAgain: PropTypes.func.isRequired,
  onTryAgain: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
}

ErrorStep.defaultProps = {
  errorCode: 0,
}

export default ErrorStep

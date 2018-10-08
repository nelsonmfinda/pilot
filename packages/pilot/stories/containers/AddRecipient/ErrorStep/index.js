import React from 'react'
import { action } from '@storybook/addon-actions'

import Section from '../../../Section'
import ErrorStep from '../../../../src/containers/AddRecipient/ErrorStep'

const props = {
  onExit: action('onExit'),
  onLoginAgain: action('onLoginAgain'),
  onTryAgain: action('onTryAgain'),
  onViewDetails: action('onViewDetails'),
  t: t => t,
}

export const ErrorStepDefault = () => (
  <Section>
    <ErrorStep {...props} />
  </Section>
)
export const ErrorStepSubmit = () => (
  <Section>
    <ErrorStep {...props} errorCode={400} />
  </Section>
)

export const ErrorStepLogin = () => (
  <Section>
    <ErrorStep {...props} errorCode={401} />
  </Section>
)

export const ErrorStepPermission = () => (
  <Section>
    <ErrorStep {...props} errorCode={403} />
  </Section>
)

export const ErrorStepServer = () => (
  <Section>
    <ErrorStep {...props} errorCode={500} />
  </Section>
)

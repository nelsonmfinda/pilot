import {
  always,
  applySpec,
  complement,
  cond,
  ifElse,
  isNil,
  path,
  pathOr,
  pathSatisfies,
  pipe,
  prop,
  propEq,
  propOr,
  propSatisfies,
  T,
  unless,
} from 'ramda'

const LIMITER = '-'

const propOrLimiter = propOr(LIMITER)

const isAntifraudScoreNil = propSatisfies(isNil, 'antifraud_score')

const isRefuseReasonNil = propSatisfies(isNil, 'refuse_reason')

const getCardProp = subProp => cond([
  [
    pathSatisfies(complement(isNil), ['card', subProp]),
    path(['card', subProp]),
  ],
  [
    propSatisfies(complement(isNil), `card_${subProp}`),
    prop(`card_${subProp}`),
  ],
  [T, always(LIMITER)],
])

const isRefuseReasonAntifraud = propEq('refuse_reason', 'antifraud')

const antifraudRecommendation = cond([
  [isAntifraudScoreNil, always(LIMITER)],
  [isRefuseReasonNil, always(LIMITER)],
  [isRefuseReasonAntifraud, always('refused')],
  [T, always('approved')],
])

const getAntifraudProp = ifElse(
  isAntifraudScoreNil,
  always(LIMITER),
  applySpec({
    recommendation: antifraudRecommendation,
    score: propOrLimiter('antifraud_score'),
  })
)

const getCustomerSubProp = subProp => pathOr(LIMITER, ['customer', subProp])

const getCaptureMethod = ifElse(
  propSatisfies(isNil, 'capture_method'),
  propOrLimiter('capture_method'),
  getCardProp('capture_method')
)

const getStatusReason = ifElse(
  propEq('status', 'refused'),
  propOrLimiter('refuse_reason'),
  propOrLimiter('status_reason')
)

const getId = unless(isNil, pipe(propOrLimiter('tid'), String))

const transactionSpec = {
  amount: propOrLimiter('amount'),
  antifraud: getAntifraudProp,
  brand_name: getCardProp('brand'),
  capture_method: getCaptureMethod,
  documents: propOrLimiter('document_number'),
  email: getCustomerSubProp('email'),
  id: getId,
  ip: propOrLimiter('ip'),
  name: getCustomerSubProp('name'),
  paid_amount: propOrLimiter('paid_amount'),
  payment_method: propOrLimiter('payment_method'),
  refund_amount: propOrLimiter('refunded_amount'),
  risk_level: propOrLimiter('risk_level'),
  status: propOrLimiter('status'),
  status_reason: getStatusReason,
  subscription: propOrLimiter('subscription_id'),
  updated_at: propOrLimiter('date_updated'),
}

export default transactionSpec


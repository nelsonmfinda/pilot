import {
  applySpec,
  concat,
  head,
  keys,
  map,
  path,
  pick,
  pipe,
  prop,
  uniq,
  values,
} from 'ramda'

import transactionSpec from '../shared/export'

const pickProps = [
  'amount',
  'antifraud',
  'brand_name',
  'capture_method',
  'documents',
  'email',
  'id',
  'ip',
  'name',
  'paid_amount',
  'payment_method',
  'refund_amount',
  'risk_level',
  'status',
  'status_reason',
  'subscription',
  'updated_at',
]

const getHeaderValidProps = pipe(
  head,
  prop('_source'),
  pick(pickProps)
)

const exportKeys = pipe(
  getHeaderValidProps,
  keys,
  concat(pickProps),
  uniq
)

const exportKeysCSV = exportData => exportKeys(exportData).join(',')

const format = exportType => (exportData) => {
  if (exportType === 'csv') {
    return values(exportData).join(',')
  }

  return values(exportData)
}

const mapSourceToData = applySpec(transactionSpec)

const formatLines = exportType => map(pipe(
  prop('_source'),
  mapSourceToData,
  format(exportType)
))

const buildData = exportType => (exportData) => {
  if (exportType === 'csv') {
    const header = exportKeysCSV(exportData)
    const lines = formatLines(exportType)
    return [header].concat(lines(exportData)).join('\r\n')
  }

  const header = exportKeys(exportData)
  const lines = formatLines(exportType)
  return [header].concat(lines(exportData))
}

const buildResult = exportType => pipe(
  path(['hits', 'hits']),
  buildData(exportType)
)

export default buildResult

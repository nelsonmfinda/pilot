import formatAnTConfig from './formatAnticipationAndTransferConfig'

const DetailRecipient = client => (data, options) => {
  const recipient = formatAnTConfig(data, options)
  console.log('ant', recipient)
  return client.recipients.create(recipient)
}
export default DetailRecipient

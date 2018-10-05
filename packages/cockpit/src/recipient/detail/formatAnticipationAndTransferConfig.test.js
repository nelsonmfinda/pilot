import formatAnticipationAndTransferConfig from './formatAnticipationAndTransferConfig'
import beforeFormat from './mocks/beforeFormat.json'
import afterFormat from './mocks/afterFormat.json'

describe('Format Anticipation and Transfer (AnT) Configuration', () => {
  it('formats AnT confiiguration correctly', () => {
    expect(formatAnticipationAndTransferConfig(beforeFormat))
      .toEqual(afterFormat)
  })
})

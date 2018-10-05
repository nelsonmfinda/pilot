function formatAnTConfig (data) {

  console.log(data)

  if(data.transferInterval === 'daily') {
    data.transferDay === ''
  }

  const weekDayNumberMap = {
    monday: '1',
    tuesday: '2',
    wednesday: '3',
    thursday: '4',
    friday: '5',
  }

  if (data.transferInterval === 'weekly')

  // const algumacoisa = (foundAnTConfig) => {
  //   const aNtConfig = foundAnTConfig.map(aNt => ({
  //     automatic_anticipation_type: aNt.anticipationModel,
  //     automatic_anticipation_days: aNt.anticipationDays,
  //     anticipatable_volume_percentage: aNt.anticipationVolumePercentage,
  //     transfer_enabled: aNt.transferEnabled,
  //     transfer_interval: aNt.transferInterval,
  //     transfer_day: aNt.transferDay,
  //     id: aNt.id,
  //   }))
  //   return aNtConfig
  // }
}

export default formatAnTConfig

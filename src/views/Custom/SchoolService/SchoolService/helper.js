import { CommisionType, FeeStatus, FeeType, timeFormat } from 'src/utils/const'

export const getFeeTypeOptions = () => {
  const { fullPay, commisionPay } = FeeType
  return [
    { value: fullPay.id, title: fullPay.title },
    { value: commisionPay.id, title: commisionPay.title },
  ]
}

export const commisionTypes = [
  { value: CommisionType.abs, title: '绝对值' },
  { value: CommisionType.percentage, title: '比例' },
]

/**
 * @param {*} param0
 */
export const tansformValues = (values) => {
  // 因为只选择了date, 默认把开始时间设置为当天的第一秒，结束时间设置为当天的最后一秒
  let { startTime, finishTime, feeType } = values
  startTime = startTime.set({
    hour: 0,
    minute: 0,
  })
  finishTime = finishTime.set({
    hour: 23,
    minute: 59,
  })
  values.startTime = startTime.format(timeFormat)
  values.finishTime = finishTime.format(timeFormat)

  // 需要根据选择的支付类型设置状态。
  values.currState =
    feeType === FeeType.fullPay.id
      ? FeeStatus.fullPayNotPay
      : FeeStatus.commisionPay

  // 如果是按比例的提成模式，需要把值转换成小数
  if (
    values.feeType === FeeType.commisionPay.id &&
    values.commisionType === CommisionType.percentage
  ) {
    values.platformCommisionFee = values.platformCommisionFee / 100
    values.refereeCommisionFee = values.refereeCommisionFee / 100
  }
  return values
}

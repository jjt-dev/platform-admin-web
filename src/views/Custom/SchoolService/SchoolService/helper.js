import { FeeStatus, FeeType, timeFormat } from 'src/utils/const'

export const getFeeTypeOptions = () => {
  const { fullPay, commissionPay } = FeeType
  return [
    { value: fullPay.id, title: fullPay.title },
    { value: commissionPay.id, title: commissionPay.title },
  ]
}

export const commissionTypes = [
  { value: 0, title: '绝对值' },
  { value: 1, title: '比例' },
]

/**
 * 因为只选择了date, 默认把结束时间设置为当天的最后一秒
 *
 * 需要根据选择的支付类型设置状态。
 *
 * @param {*} param0
 */
export const tansformValues = (values) => {
  let { startTime, finishTime, feeType } = values
  finishTime = finishTime.set({
    hour: 23,
    minute: 59,
  })
  values.startTime = startTime.format(timeFormat)
  values.finishTime = finishTime.format(timeFormat)
  values.currState =
    feeType === FeeType.fullPay.id
      ? FeeStatus.fullPayNotPay
      : FeeStatus.commissionPay
  return values
}

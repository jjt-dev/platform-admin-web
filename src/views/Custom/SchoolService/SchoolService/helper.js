import { FeeType } from 'src/utils/const'

export const getFeeTypeOptions = () => {
  const { fullPay, commissionPay } = FeeType
  return [
    { value: fullPay.id, title: fullPay.title },
    { value: commissionPay.id, title: commissionPay.title },
  ]
}

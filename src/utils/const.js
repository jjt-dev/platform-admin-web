export const timeFormat = 'YYYY-MM-DD HH:mm'
export const dateFormat = 'YYYY-MM-DD'

export const formLayoutLogin = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}

export const formLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}

export const emptyLayout = {
  labelCol: {},
  wrapperCol: {},
}

export const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

export const EntityStatus = {
  CREATE: '新增',
  EDIT: '编辑',
}

export const FeeType = {
  fullPay: {
    id: 0,
    title: '一次性支付',
  },
  commissionPay: {
    id: 1,
    title: '每单提成',
  },
}

export const FeeStatus = {
  fullPayNotPay: 0,
  fullPayPaid: 10,
  commissionPay: 20,
}

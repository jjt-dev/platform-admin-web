import { Form, InputNumber } from 'antd'
import React from 'react'
import './index.less'

const FormInputNum = ({ label, name, required, type, suffix, ...rest }) => {
  const parsers = {
    integer: (value) => value.replace(/^(0+)|[^\d]/g, ''),
  }

  return (
    <Form.Item
      rules={[{ required: required ?? true }]}
      label={label}
      name={name}
    >
      <InputNumber
        className="form-input-number"
        formatter={(value) => `${value} ${suffix ?? ''}`}
        parser={parsers[type]}
        {...rest}
      />
    </Form.Item>
  )
}

export default FormInputNum

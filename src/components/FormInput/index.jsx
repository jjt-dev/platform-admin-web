import { Form, Input } from 'antd'
import React from 'react'

const { TextArea } = Input

const FormInput = ({ label, name, required, type }) => {
  return (
    <Form.Item
      rules={[{ required: required ?? true }]}
      label={label}
      name={name}
    >
      {type === 'textarea' ? <TextArea rows={2} /> : <Input />}
    </Form.Item>
  )
}

export default FormInput

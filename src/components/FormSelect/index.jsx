import { Form, Select } from 'antd'
import React from 'react'

const { Option } = Select

const FormSelect = ({ options, label, name, message }) => {
  return (
    <Form.Item rules={[{ required: true, message }]} label={label} name={name}>
      <Select placeholder={message}>
        {options.map((item) => (
          <Option key={item.id} value={item.id}>
            {item.name}
          </Option>
        ))}
      </Select>
    </Form.Item>
  )
}

export default FormSelect

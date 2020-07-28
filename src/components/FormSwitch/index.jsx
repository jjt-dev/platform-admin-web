import { Form, Radio } from 'antd'
import React from 'react'

const FormSwitch = ({ label, name }) => {
  return (
    <Form.Item
      initialValue={true}
      rules={[{ required: true }]}
      label={label ?? '启用'}
      name={name ?? 'isEnable'}
    >
      <Radio.Group>
        <Radio value={true}>是</Radio>
        <Radio value={false}>否</Radio>
      </Radio.Group>
    </Form.Item>
  )
}

export default FormSwitch

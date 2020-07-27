import { Form } from 'antd'
import React from 'react'
import ImageUpload from '../ImageUpload'

const FormImage = ({ form, label, name, message }) => {
  const handleLogoChange = (imageUrl) => {
    form.setFieldsValue({
      logoUrl: imageUrl,
    })
  }

  return (
    <Form.Item rules={[{ required: true, message }]} label={label} name={name}>
      <ImageUpload callback={handleLogoChange} />
    </Form.Item>
  )
}

export default FormImage

import React, { useEffect } from 'react'
import './index.less'
import { Form, Input, Button, Radio, message, Select } from 'antd'
import { useSelector } from 'react-redux'
import { EntityStatus, formLayout } from 'src/utils/const'
import { buildParameters } from 'src/utils/common'
import useFetch from 'src/hooks/useFetch'
import api from 'src/utils/api'
import FormBottom from 'src/components/FormBottom'
import ImageUpload from 'src/components/ImageUpload'

const { Option } = Select

const School = ({ match, history }) => {
  const { id: schoolId } = match.params
  const [form] = Form.useForm()
  const { allCourses } = useSelector((state) => state.app)
  const [schoolInEdit, fetchSchool] = useFetch()
  const isEdit = !!schoolId
  const status = isEdit ? EntityStatus.EDIT : EntityStatus.CREATE

  useEffect(() => {
    if (schoolId) {
      fetchSchool()
    }
  }, [fetchSchool, schoolId])

  const onFinish = async (values) => {
    const { username, password } = values
    try {
      const result = await api.post(
        `/common/login?username=${username}&password=${password}`
      )
      history.push('/')
    } catch (e) {
      console.log(e)
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const handleLogoChange = (imageUrl) => {
    form.setFieldsValue({
      logoUrl: imageUrl,
    })
  }

  return (
    <div className="page jjt-form">
      <div className="jjt-form-title">{status}学校</div>
      <Form
        form={form}
        {...formLayout}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          rules={[{ required: true, message: '请选择科目' }]}
          label="科目"
          name="courseId"
        >
          <Select placeholder="请选择科目">
            {allCourses.map((course) => (
              <Option key={course.id} value={course.id}>
                {course.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item rules={[{ required: true }]} label="名称" name="name">
          <Input />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: '请上传头像' }]}
          label="头像"
          name="logoUrl"
        >
          <ImageUpload
            callback={handleLogoChange}
            imageUrl={schoolInEdit?.faceUrl}
          />
        </Form.Item>
        <FormBottom path="/school/list" />
      </Form>
    </div>
  )
}

export default School

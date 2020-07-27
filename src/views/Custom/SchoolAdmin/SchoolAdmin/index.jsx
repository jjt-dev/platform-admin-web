import React, { useEffect, useState } from 'react'
import './index.less'
import { Form, message } from 'antd'
import { EntityStatus, formLayout } from 'src/utils/const'
import api from 'src/utils/api'
import FormBottom from 'src/components/FormBottom'
import FormSelect from 'src/components/FormSelect'
import FormInput from 'src/components/FormInput'
import FormImage from 'src/components/FormImage'
import { buildParameters } from 'src/utils/common'
import FormRadio from 'src/components/FormRadio'
import { useSelector } from 'react-redux'

const SchoolAdmin = ({ match, history }) => {
  const { id: adminId } = match.params
  const { allSchools } = useSelector((state) => state.app)
  const [form] = Form.useForm()
  const [admin, setAdmin] = useState()
  const isEdit = !!adminId
  const status = isEdit ? EntityStatus.EDIT : EntityStatus.CREATE

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(`/client/school/admin/item?id=${adminId}`)
      setAdmin(result)
      form.setFieldsValue(result)
    }
    if (adminId) {
      fetchData()
    }
  }, [adminId, form])

  const onFinish = async (values) => {
    if (!!adminId) {
      values.id = adminId
    }
    await api.post(buildParameters(`/client/school/admin/edit`, values))
    message.success(`${status}学校管理员成功`)
    history.push('/school/user')
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="page jjt-form">
      <div className="jjt-form-title">{status}学校管理员</div>
      <Form
        form={form}
        {...formLayout}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <FormInput label="用户名" name="username" disabled={isEdit} />
        <FormInput label="昵称" name="nickname" />
        {!isEdit && <FormInput label="密码" name="password" />}
        <FormImage
          form={form}
          label="头像"
          name="faceUrl"
          message="请上传头像"
          imageUrl={admin?.faceUrl}
        />
        <FormInput label="联系电话" name="phone" />
        <FormInput label="邮箱" name="email" />
        <FormSelect
          options={allSchools}
          label="学校"
          name="schoolId"
          message="请选择学校"
        />
        <FormRadio />
        <FormBottom path="/school/user" />
      </Form>
    </div>
  )
}

export default SchoolAdmin

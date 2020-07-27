import React, { useEffect, useState } from 'react'
import './index.less'
import { Form, message } from 'antd'
import { useSelector } from 'react-redux'
import { EntityStatus, formLayout } from 'src/utils/const'
import api from 'src/utils/api'
import FormBottom from 'src/components/FormBottom'
import FormSelect from 'src/components/FormSelect'
import FormInput from 'src/components/FormInput'
import FormImage from 'src/components/FormImage'
import { buildParameters } from 'src/utils/common'
import FormRadio from 'src/components/FormRadio'

const SchoolAdmin = ({ match, history }) => {
  const { id: adminId } = match.params
  const [form] = Form.useForm()
  const [admin, setAdmin] = useState()
  const { allCourses, allReferees } = useSelector((state) => state.app)
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
        <FormSelect
          options={allCourses}
          label="科目"
          name="courseId"
          message="请选择科目"
        />
        <FormInput label="名称" name="name" />
        <FormImage
          form={form}
          label="头像"
          name="logoUrl"
          message="请上传头像"
          imageUrl={admin?.logoUrl}
        />
        <FormInput label="地址" name="address" />
        <FormInput label="联系人" name="linkMan" />
        <FormInput label="联系电话" name="linkPhone" />
        <FormRadio />
        <FormSelect
          options={allReferees}
          label="引荐人"
          name="refereeId"
          message="请选择引荐人"
          required={false}
        />
        <FormInput label="描述" name="note" required={false} type="textarea" />
        <FormBottom path="/school/list" />
      </Form>
    </div>
  )
}

export default SchoolAdmin

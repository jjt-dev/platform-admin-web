import React, { useEffect } from 'react'
import './index.less'
import { Form } from 'antd'
import { useSelector } from 'react-redux'
import { EntityStatus, formLayout } from 'src/utils/const'
import useFetch from 'src/hooks/useFetch'
import api from 'src/utils/api'
import FormBottom from 'src/components/FormBottom'
import FormSelect from 'src/components/FormSelect'
import FormInput from 'src/components/FormInput'
import FormImage from 'src/components/FormImage'

const School = ({ match, history }) => {
  const { id: schoolId } = match.params
  const [form] = Form.useForm()
  const { allCourses, allReferees } = useSelector((state) => state.app)
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
    console.log('value', values)
    // try {
    //   const result = await api.post(
    //     `/common/login?username=${username}&password=${password}`
    //   )
    //   history.push('/')
    // } catch (e) {
    //   console.log(e)
    // }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
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
        />
        <FormInput label="地址" name="address" />
        <FormInput label="联系人" name="linkMan" />
        <FormInput label="联系电话" name="linkPhone" />
        <FormSelect
          options={allReferees}
          label="引荐人"
          name="refereeId"
          message="请选择引荐人"
        />
        <FormInput label="描述" name="note" required={false} type="textarea" />
        <FormBottom path="/school/list" />
      </Form>
    </div>
  )
}

export default School

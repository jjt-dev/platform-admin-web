import React, { useEffect, useState } from 'react'
import './index.less'
import { Form, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { EntityStatus, formLayout } from 'src/utils/const'
import api from 'src/utils/api'
import FormBottom from 'src/components/FormBottom'
import FormSelect from 'src/components/FormSelect'
import FormInput from 'src/components/FormInput'
import FormImage from 'src/components/FormImage'
import { buildParameters } from 'src/utils/common'
import FormRadio from 'src/components/FormRadio'
import * as appAction from 'src/actions/app'

const School = ({ match, history }) => {
  const dispatch = useDispatch()
  const { id: schoolId } = match.params
  const [school, setSchool] = useState()
  const [form] = Form.useForm()
  const { allCourses, allReferees } = useSelector((state) => state.app)
  const isEdit = !!schoolId
  const status = isEdit ? EntityStatus.EDIT : EntityStatus.CREATE

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(`/client/school/item?id=${schoolId}`)
      setSchool(result)
      form.setFieldsValue(result)
    }
    if (schoolId) {
      fetchData()
    }
  }, [schoolId, form])

  const onFinish = async (values) => {
    if (!!schoolId) {
      values.id = schoolId
    }
    await api.post(buildParameters(`/client/school/edit`, values))
    message.success(`${status}学校成功`)
    dispatch(appAction.getAllSchools())
    history.push('/school/list')
  }

  return (
    <div className="page jjt-form">
      <div className="jjt-form-title">{status}学校</div>
      <Form form={form} {...formLayout} onFinish={onFinish}>
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
          imageUrl={school?.logoUrl}
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

export default School

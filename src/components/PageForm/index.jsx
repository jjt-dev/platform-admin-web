import { Form, message } from 'antd'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import FormBottom from 'src/components/FormBottom'
import useActiveRoute from 'src/hooks/useActiveRoute'
import useFetch from 'src/hooks/useFetch'
import usePageForm from 'src/hooks/usePageForm'
import api from 'src/utils/api'
import { buildFormPath } from 'src/utils/common'
import { formLayout } from 'src/utils/const'

import FormDate from '../FormDate'
import FormEnableRadio from '../FormEnableRadio'
import FormImage from '../FormImage'
import FormInput from '../FormInput'
import FormSelect from '../FormSelect'

const PageForm = ({
  callback,
  formItems,
  titlePrefix = '',
  params: defaultParams = {},
  backPath: customBackPath,
}) => {
  const history = useHistory()
  const { path, title, back, apiPath = path } = useActiveRoute()
  const [form] = Form.useForm()
  const [entityId, isEdit, status] = usePageForm()
  const [entity] = useFetch(isEdit ? `${apiPath}/item?id=${entityId}` : '')
  const backPath = customBackPath ?? back?.path

  useEffect(() => {
    form.setFieldsValue(entity ?? null)
  }, [entity, form])

  const onFinish = async (values) => {
    if (!!entityId) {
      values.id = entityId
    }
    await api.post(
      buildFormPath(`${apiPath}/edit`, { ...values, ...defaultParams })
    )
    message.success(`${status}${title}成功`)
    if (back) {
      history.push(backPath)
    }
    callback && callback()
  }

  return (
    <div className="page jjt-form">
      <div className="jjt-form-title">
        {status}
        {titlePrefix}
        {title}
      </div>
      <Form {...formLayout} form={form} onFinish={onFinish}>
        {formItems.map((item, index) => {
          const { comp, disabled, hide, ...rest } = item
          rest.key = index
          rest.form = form
          if (disabled === 'isEdit') {
            rest.disabled = isEdit
          }
          if (comp === 'FormImage') {
            rest.imageUrl = entity ? entity[item.name] : ''
          }
          if (hide === 'isEdit' && isEdit) {
            return null
          }
          return React.createElement(compMap[comp], rest)
        })}
        <FormBottom path={backPath} />
      </Form>
    </div>
  )
}

export default PageForm

const compMap = {
  FormInput,
  FormEnableRadio,
  FormImage,
  FormSelect,
  FormDate,
}

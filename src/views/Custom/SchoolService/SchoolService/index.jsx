import React, { useEffect, useState } from 'react'
import './index.less'
import { Form, message } from 'antd'
import { EntityStatus, formLayout } from 'src/utils/const'
import api from 'src/utils/api'
import FormBottom from 'src/components/FormBottom'
import FormSelect from 'src/components/FormSelect'
import FormInput from 'src/components/FormInput'
import { buildParameters } from 'src/utils/common'
import { useSelector } from 'react-redux'
import FormDate from 'src/components/FormDate'
import FormRadioGroup from 'src/components/FormRadio'
import moment from 'moment'
import { getFeeTypeOptions } from './helper'

const SchoolService = ({ match, history }) => {
  const { id: serviceId } = match.params
  const { allReferees } = useSelector((state) => state.app)
  const [form] = Form.useForm()
  const [service, setService] = useState()
  const isEdit = !!serviceId
  const status = isEdit ? EntityStatus.EDIT : EntityStatus.CREATE

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(
        `/client/school/serviceSpan/item?id=${serviceId}`
      )
      setService(result)
      form.setFieldsValue(result)
    }
    if (serviceId) {
      fetchData()
    }
  }, [serviceId, form])

  const onFinish = async (values) => {
    if (!!serviceId) {
      values.id = serviceId
    }
    await api.post(buildParameters(`/client/school/serviceSpan/edit`, values))
    message.success(`${status}服务期限成功`)
    history.push('/school/serviceSpan')
  }

  /**
   * 服务开始时间不得早于今天
   */
  const disabledStart = (current) => {
    return current && current < moment().endOf('day')
  }
  /**
   * 服务结束时间比开始时间要大于等一一个月
   */
  const disabledEnd = (current) => {
    const isStartFromToday = current && current < moment().endOf('day')
    if (isStartFromToday) return true

    const startDate = form.getFieldValue('startTime')
    if (!startDate) return false

    const oneMonthLater = moment(startDate).add(1, 'M')
    return oneMonthLater > current
  }

  return (
    <div className="page jjt-form">
      <div className="jjt-form-title">{status}服务期限</div>
      <Form form={form} {...formLayout} onFinish={onFinish}>
        <FormInput label="名称" name="title" />
        <FormSelect
          options={allReferees}
          label="引荐人"
          name="refereeId"
          required={false}
          message="请选择引荐人"
        />
        <FormDate
          label="开始时间"
          name="startTime"
          disabledDate={disabledStart}
        />
        <FormDate
          label="结束时间"
          name="finishTime"
          disabledDate={disabledEnd}
        />
        <FormRadioGroup
          label="支付方式"
          name="feeType"
          options={getFeeTypeOptions()}
        />
        <FormBottom path="/school/serviceSpan" />
      </Form>
    </div>
  )
}

export default SchoolService

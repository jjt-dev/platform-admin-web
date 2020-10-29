import { Form, message, Select } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import FormInputNum from 'src/components/FormInputNum'
import PageFormCustom from 'src/components/PageFormCustom'
import api from 'src/utils/api'
import { useTypes } from 'src/utils/const'
import {
  courseAgentLevelEditPath,
  courseAgentLevelPath,
} from 'src/utils/httpUtil'

const AgentLevel = () => {
  const { allCourses } = useSelector((state) => state.app)
  const [form] = Form.useForm()
  const [levels, setLevels] = useState([])
  const [useType, setUseType] = useState(useTypes.exam.id)

  useEffect(() => {
    form.setFieldsValue({ useType: useTypes.exam.id })
  }, [form])

  const onUseTypeChange = (useType) => {
    form.setFieldsValue({ useType })
    setUseType(useType)
  }

  const onCourseChange = useCallback(
    (courseId) => {
      form.setFieldsValue({ course: courseId })
      const fetchLevels = async () => {
        const result = await api.get(courseAgentLevelPath(courseId, useType))
        setLevels(result)
        const formValues = result.reduce((result, level) => {
          result[level.agentLevelName] = level.price
          return result
        }, {})
        form.setFieldsValue({ ...formValues, course: courseId })
      }
      fetchLevels()
    },
    [form, useType]
  )

  useEffect(() => {
    if (allCourses.length > 0) {
      onCourseChange(allCourses[0].id)
    }
  }, [allCourses, onCourseChange])

  const onFinish = async (values) => {
    const payload = levels.map((level) => ({
      courseId: values.course,
      agentLevelId: level.agentLevelId,
      price: values[level.agentLevelName],
      useType,
    }))
    await api.post(courseAgentLevelEditPath, payload)
    message.success('代理等级价格修改成功')
  }

  return (
    <PageFormCustom
      form={form}
      onFinish={onFinish}
      fullTitle="代理等级价格配置"
    >
      <Form.Item label="名额类型" name="useType">
        <Select onChange={onUseTypeChange}>
          {Object.values(useTypes).map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="科目" name="course">
        <Select onChange={onCourseChange}>
          {allCourses.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      {levels.map((level) => (
        <FormInputNum
          key={level.id}
          label={level.agentLevelName}
          name={level.agentLevelName}
          type="integer"
          min={0}
          suffix="元"
        />
      ))}
    </PageFormCustom>
  )
}

export default AgentLevel

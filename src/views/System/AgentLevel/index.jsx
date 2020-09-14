import { Form, message } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import FormInputNum from 'src/components/FormInputNum'
import FormSelect from 'src/components/FormSelect'
import PageFormCustom from 'src/components/PageFormCustom'
import api from 'src/utils/api'

const AgentLevel = () => {
  const { allCourses } = useSelector((state) => state.app)
  const [form] = Form.useForm()
  const [levels, setLevels] = useState([])

  const onCourseChange = useCallback(
    (courseId) => {
      form.setFieldsValue({ course: courseId })
      const fetchLevels = async () => {
        const result = await api.get(courseAgentLevelPath(courseId))
        setLevels(result)
        const formValues = result.reduce((result, level) => {
          result[level.agentLevelName] = level.price
          return result
        }, {})
        form.setFieldsValue({ ...formValues, course: courseId })
      }
      fetchLevels()
    },
    [form]
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
    }))
    await api.post(`/config/course/agentLevel/price/edit`, payload)
    message.success('代理等级价格修改成功')
  }

  return (
    <PageFormCustom
      form={form}
      onFinish={onFinish}
      fullTitle="代理等级价格配置"
    >
      <FormSelect
        onChange={onCourseChange}
        label="科目"
        name="course"
        options={allCourses}
        titleKey="name"
      />
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

const courseAgentLevelPath = (courseId) =>
  `/config/course/agentLevel/price/list?courseId=${courseId}`

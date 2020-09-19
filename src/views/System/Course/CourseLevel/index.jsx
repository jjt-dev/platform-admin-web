import React from 'react'
import { useParams } from 'react-router'
import PageForm from 'src/components/PageForm'

const CourseLevel = () => {
  const { courseId, name } = useParams()

  return (
    <PageForm
      formItems={getFormItems()}
      titlePrefix={name}
      backPath={`/system/course/${courseId}/${name}/level/list`}
      defaultValues={{ courseId }}
    />
  )
}

export default CourseLevel

const getFormItems = () => [
  {
    comp: 'FormInput',
    name: 'courseId',
    hide: true,
  },
  {
    label: '等级名称',
    comp: 'FormInput',
    name: 'name',
  },
  {
    label: '别名',
    comp: 'FormInput',
    name: 'alias',
  },
  {
    label: '默认价格',
    comp: 'FormInputNum',
    name: 'price',
    type: 'integer',
    min: 0,
    suffix: '元',
  },
  {
    label: '序号',
    comp: 'FormInputNum',
    name: 'sortOrder',
    min: 1,
  },
  {
    label: '描述',
    comp: 'FormInput',
    name: 'note',
    required: false,
  },
]

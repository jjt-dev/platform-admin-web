import React from 'react'
import { useParams } from 'react-router'
import PageForm from 'src/components/PageForm'

const CourseItem = () => {
  const { courseId, name } = useParams()

  return (
    <PageForm
      formItems={getFormItems()}
      titlePrefix={name}
      backPath={`/system/course/${courseId}/${name}/item/list`}
      defaultValues={{ courseId, sortOrder: 1 }}
    />
  )
}

export default CourseItem

const getFormItems = () => [
  {
    comp: 'FormInput',
    name: 'courseId',
    hide: true,
  },
  {
    label: '考项名称',
    comp: 'FormInput',
    name: 'name',
  },
  {
    label: '默认差评',
    comp: 'FormInput',
    name: 'defaultBadComment',
  },
  {
    label: '序号',
    comp: 'FormInputNum',
    name: 'sortOrder',
    min: 1,
  },
  {
    comp: 'FormEnableRadio',
  },
  {
    label: '描述',
    comp: 'FormInput',
    name: 'note',
    required: false,
  },
]

import React from 'react'
import { useParams } from 'react-router'
import PageForm from 'src/components/PageForm'

const CourseAssociation = () => {
  const { courseId, name } = useParams()

  return (
    <PageForm
      formItems={getFormItems()}
      titlePrefix={name}
      backPath={`/system/course/${courseId}/${name}/association/list`}
      defaultValues={{ courseId }}
    />
  )
}

export default CourseAssociation

const getFormItems = () => [
  {
    comp: 'FormInput',
    name: 'courseId',
    hide: true,
  },
  {
    label: '协会名称',
    comp: 'FormInput',
    name: 'name',
  },
  {
    label: '协会logo',
    comp: 'FormImage',
    message: '请上传logo',
    name: 'logUrl',
  },
  {
    comp: 'FormEnableRadio',
  },
  {
    label: '备注',
    comp: 'FormInput',
    name: 'note',
    required: false,
  },
]

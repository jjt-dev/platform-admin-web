import React from 'react'
import PageForm from 'src/components/PageForm'

const Course = () => {
  return <PageForm formItems={getFormItems()} />
}

export default Course

const getFormItems = () => [
  {
    label: '名称',
    comp: 'FormInput',
    name: 'name',
  },
  {
    label: '考试时长',
    comp: 'FormInputNum',
    min: 0,
    name: 'examDuration',
    suffix: '秒',
  },
  {
    comp: 'FormEnableRadio',
  },
  {
    label: '备注',
    comp: 'FormInput',
    type: 'textarea',
    name: 'note',
    required: false,
  },
]

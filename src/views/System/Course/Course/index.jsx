import React from 'react'
import PageForm from 'src/components/PageForm'
import { useDispatch } from 'react-redux'
import * as appAction from 'src/actions/app'

const Course = () => {
  const dispatch = useDispatch()
  const getAllCourses = () => dispatch(appAction.getAllCourses())

  return <PageForm formItems={getFormItems()} callback={getAllCourses} />
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

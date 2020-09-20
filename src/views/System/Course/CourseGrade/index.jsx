import React from 'react'
import { useParams } from 'react-router'
import PageForm from 'src/components/PageForm'

const CourseGrade = () => {
  const { courseId, name } = useParams()

  return (
    <PageForm
      formItems={getFormItems()}
      titlePrefix={name}
      backPath={`/system/course/${courseId}/${name}/grade/list`}
      defaultValues={{ courseId }}
    />
  )
}

export default CourseGrade

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
    label: '起始分数',
    comp: 'FormInputNum',
    name: 'startScore',
    min: 0,
    max: 100,
  },
  {
    label: '截止分数',
    comp: 'FormInputNum',
    name: 'endScore',
    min: 0,
    max: 100,
    rules: [
      ({ getFieldValue }) => ({
        validator(rule, value) {
          if (value > getFieldValue('startScore')) {
            return Promise.resolve()
          }
          return Promise.reject('截止分数必须大于起始分数')
        },
      }),
    ],
  },
  {
    label: '背景颜色值',
    comp: 'FormInput',
    name: 'bgColor',
    required: false,
  },
  {
    label: '描述',
    comp: 'FormInput',
    name: 'note',
    required: false,
  },
]

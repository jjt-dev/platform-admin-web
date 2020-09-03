import './index.less'

import React from 'react'
import PageForm from 'src/components/PageForm'
import { useSelector } from 'react-redux'

const Agent = () => {
  const { agentLevels } = useSelector((state) => state.app)
  return <PageForm formItems={getFormItems(agentLevels)} />
}

export default Agent

const getFormItems = (agentLevels) => [
  {
    label: '代理商姓名',
    comp: 'FormInput',
    name: 'name',
  },
  {
    label: '代理级别',
    comp: 'FormSelect',
    name: 'currLevelId',
    titleKey: 'name',
    options: agentLevels,
  },
  {
    label: '手机号',
    comp: 'FormInput',
    name: 'phone',
  },
  {
    label: '昵称',
    comp: 'FormInput',
    name: 'nickname',
  },
  {
    comp: 'FormEnableRadio',
  },
  {
    label: '描述',
    comp: 'FormInput',
    type: 'textarea',
    name: 'note',
    required: false,
  },
]

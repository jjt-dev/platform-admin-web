import React from 'react'
import { useSelector } from 'react-redux'
import PageForm from 'src/components/PageForm'

const Agent = () => {
  const { agentLevels } = useSelector((state) => state.app)
  return <PageForm formItems={getFormItems(agentLevels)} />
}

export default Agent

const getFormItems = (agentLevels) => [
  {
    label: '代理商名称',
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
    label: '联系人',
    comp: 'FormInput',
    name: 'linkMan',
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

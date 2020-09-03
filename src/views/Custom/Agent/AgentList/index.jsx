import React from 'react'
import { useSelector } from 'react-redux'
import PageList from 'src/components/PageList'
import { findById } from 'src/utils/common'
import {
  getActionRow,
  getDateRow,
  getRow,
  tableOrder,
  getSwitchRow,
  getCustomRow,
} from 'src/utils/tableUtil'

const AgentList = () => {
  const { agentLevels } = useSelector((state) => state.app)
  return <PageList columns={getColumns(agentLevels)} />
}

export default AgentList

const getColumns = (agentLevels) => (deleteAgent, updateAgentStatus) => [
  tableOrder,
  getRow('代理商名称', 'name'),
  getCustomRow(
    '代理级别',
    (record) => findById(agentLevels, record.currLevelId).name
  ),
  getRow('电话', 'phone'),
  getSwitchRow(updateAgentStatus),
  getDateRow('创建时间', 'createTime'),
  getActionRow((record) => `/agent/edit/${record.id}`, deleteAgent),
]

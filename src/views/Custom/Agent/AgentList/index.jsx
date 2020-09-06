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
import { Link } from 'react-router-dom'

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
  getRow('联系人', 'linkMan'),
  getActionRow(
    (record) => `/agent/edit/${record.id}`,
    deleteAgent,
    (record) => (
      <Link to={`/agent/admin/list?agentId=${record.id}&agent=${record.name}`}>
        管理员
      </Link>
    )
  ),
]

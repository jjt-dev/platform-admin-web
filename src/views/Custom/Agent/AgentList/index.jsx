import React from 'react'
import { useSelector } from 'react-redux'
import PageList from 'src/components/PageList'
import { findById } from 'src/utils/common'
import { agentUrl } from 'src/utils/const'
import {
  getActionRow,
  getCustomRow,
  getDateRow,
  getExternalLinkRow,
  getLinkRow,
  getRow,
  getSwitchRow,
  tableOrder,
} from 'src/utils/tableUtil'

const AgentList = () => {
  const { agentLevels } = useSelector((state) => state.app)
  return <PageList columns={getColumns(agentLevels)} />
}

export default AgentList

const getColumns = (agentLevels) => (deleteAgent, updateAgentStatus) => [
  tableOrder,
  getRow('代理商名称', 'name'),
  getExternalLinkRow(agentUrl),
  getLinkRow('管理员', `/agent/:id/:name/admin/list`),
  getLinkRow('订单', `/agent/:id/:name/order/list`),
  getCustomRow(
    '代理级别',
    (record) => findById(agentLevels, record.currLevelId).name
  ),
  getRow('电话', 'phone'),
  getSwitchRow(updateAgentStatus),
  getDateRow('创建时间', 'createTime'),
  getRow('联系人', 'linkMan'),
  getActionRow((record) => `/agent/edit/${record.id}`, deleteAgent),
]

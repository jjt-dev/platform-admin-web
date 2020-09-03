import React from 'react'
import PageList from 'src/components/PageList'
import { findById } from 'src/utils/common'
import { AgentLevel } from 'src/utils/const'
import {
  getActionRow,
  getDateRow,
  getRow,
  tableOrder,
  getSwitchRow,
  getCustomRow,
} from 'src/utils/tableUtil'

const AgentList = () => {
  return <PageList columns={getColumns} />
}

export default AgentList

const getColumns = (deleteAgent, updateAgentStatus) => [
  tableOrder,
  getRow('姓名', 'name'),
  getCustomRow(
    '代理级别',
    (record) => findById(AgentLevel, record.currLevelId).title
  ),
  getRow('电话', 'phone'),
  getSwitchRow(updateAgentStatus),
  getDateRow('创建时间', 'createTime'),
  getActionRow((record) => `/agent/edit/${record.id}`, deleteAgent),
]

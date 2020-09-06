import React from 'react'
import PageList from 'src/components/PageList'
import {
  getActionRow,
  getDateRow,
  getRow,
  tableOrder,
  getSwitchRow,
  getAvatarRow,
} from 'src/utils/tableUtil'
import useParamsSearch from 'src/hooks/useParamsSearch'
import useActiveRoute from 'src/hooks/useActiveRoute'
import useTableFetch from 'src/hooks/useTableFetch'

const AgentAdminList = () => {
  const { agentId, agent } = useParamsSearch()
  const { apiPath } = useActiveRoute(0)
  const adminList = useTableFetch(`${apiPath}/page`, { agentId })
  return (
    <PageList
      columns={getColumns}
      defaultTableList={adminList}
      title={`${agent}管理员`}
    />
  )
}

export default AgentAdminList

const getColumns = (deleteAgent, updateAgentStatus) => [
  tableOrder,
  getRow('名称', 'username'),
  getRow('昵称', 'nickname'),
  getAvatarRow(),
  getRow('电话', 'phone'),
  getSwitchRow(updateAgentStatus),
  getDateRow('创建时间', 'createTime'),
  getRow('邮箱', 'email'),
  getActionRow((record) => `/agent/edit/${record.id}`, deleteAgent),
]

import React from 'react'
import { useParams } from 'react-router'
import PageList from 'src/components/PageList'
import useActiveRoute from 'src/hooks/useActiveRoute'
import useTableFetch from 'src/hooks/useTableFetch'
import {
  getActionRow,
  getAvatarRow,
  getDateRow,
  getRow,
  getSwitchRow,
  tableOrder,
  changePsdAction,
} from 'src/utils/tableUtil'

const AgentAdminList = () => {
  const { agentId, agent } = useParams()
  const { apiPath } = useActiveRoute()
  const adminList = useTableFetch(`${apiPath}/page`, { agentId })
  const addAdminPath = `/agent/${agentId}/${agent}/admin/edit`
  return (
    <PageList
      columns={getColumns(addAdminPath)}
      defaultTableList={adminList}
      title={`${agent}管理员`}
      addCallback={addAdminPath}
    />
  )
}

export default AgentAdminList

const getColumns = (addAdminPath) => (
  deleteAgent,
  updateAgentStatus,
  selectAdmin
) => [
  tableOrder,
  getRow('名称', 'username'),
  getRow('昵称', 'nickname'),
  getAvatarRow(),
  getRow('电话', 'phone'),
  getSwitchRow(updateAgentStatus),
  getDateRow('创建时间', 'createTime'),
  getRow('邮箱', 'email'),
  getActionRow(
    (record) => `${addAdminPath}/${record.id}`,
    deleteAgent,
    changePsdAction(selectAdmin)
  ),
]

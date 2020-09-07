import React from 'react'
import { useParams } from 'react-router'
import PageList from 'src/components/PageList'
import useActiveRoute from 'src/hooks/useActiveRoute'
import useTableFetch from 'src/hooks/useTableFetch'
import {
  getDateRow,
  getRow,
  tableOrder,
  getCustomRow,
} from 'src/utils/tableUtil'

const AgentOrderList = () => {
  const { agentId, agent } = useParams()
  const { apiPath } = useActiveRoute()
  const adminList = useTableFetch(`${apiPath}/page`, { agentId })
  const addOrderPath = `/agent/${agentId}/${agent}/order/edit`
  return (
    <PageList
      columns={getColumns}
      defaultTableList={adminList}
      title={`${agent}订单`}
      addCallback={addOrderPath}
    />
  )
}

export default AgentOrderList

const getColumns = () => [
  tableOrder,
  getRow('科目', 'courseName'),
  getRow('订单数量', 'amount'),
  getCustomRow('订单单价', (record) => `${record.price}元`),
  getDateRow('创建时间', 'createTime'),
]

import { Table } from 'antd'
import React from 'react'
import { useParams } from 'react-router'
import PageCustom from 'src/components/PageCustom'
import useFetch from 'src/hooks/useFetch'
import { findUseType } from 'src/utils/common'
import { getCustomRow, getRow, tableOrder } from 'src/utils/tableUtil'

const AgentAccount = () => {
  const { agentId, agentName } = useParams()
  const [agentAccount = []] = useFetch(
    `/client/agent/account/accountInfos?agentId=${agentId}`
  )

  return (
    <PageCustom title={`${agentName}账户信息`}>
      <Table
        rowKey="id"
        columns={getColumns()}
        dataSource={agentAccount}
        style={{ width: '600px', margin: '0 auto' }}
        pagination={false}
        bordered
      />
    </PageCustom>
  )
}

export default AgentAccount

const getColumns = () => [
  tableOrder,
  getRow('科目', 'courseName'),
  getRow('余额', 'balance'),
  getCustomRow('余额类型', (record) => findUseType(record.useType).name),
]

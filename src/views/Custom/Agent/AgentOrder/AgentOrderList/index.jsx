import { Button, message, Modal } from 'antd'
import React from 'react'
import { useParams } from 'react-router'
import PageList from 'src/components/PageList'
import useActiveRoute from 'src/hooks/useActiveRoute'
import useTableFetch from 'src/hooks/useTableFetch'
import api from 'src/utils/api'
import { findUseType } from 'src/utils/common'
import { useTypes } from 'src/utils/const'
import { payOrderPath } from 'src/utils/httpUtil'
import {
  getCustomRow,
  getDateRow,
  getRow,
  tableOrder,
} from 'src/utils/tableUtil'

const { confirm } = Modal

const AgentOrderList = () => {
  const { agentId, agent } = useParams()
  const { apiPath } = useActiveRoute()
  const adminList = useTableFetch(`${apiPath}/page`, { agentId })
  const addOrderPath = `/agent/${agentId}/${agent}/order/edit`

  const confirmPay = (orderId) => {
    confirm({
      title: `请问您确认要支付该订单吗?`,
      onOk: async () => {
        await api.post(payOrderPath(orderId))
        message.success(`支付订单成功`)
        adminList.fetchTable()
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  return (
    <PageList
      columns={getColumns(confirmPay)}
      defaultTableList={adminList}
      title={`${agent}订单`}
      addCallback={addOrderPath}
    />
  )
}

export default AgentOrderList

const getColumns = (confirmPay) => () => [
  tableOrder,
  getRow('科目', 'courseName'),
  orderUseTypeRow,
  getRow('订单数量', 'amount'),
  getCustomRow('订单单价', (record) => `${record.price}元`),
  getOrderPayedRow(confirmPay),
  getDateRow('创建时间', 'createTime'),
]

const orderUseTypeRow = {
  ...getCustomRow('订单类型', (record) => findUseType(record.useType).name),
  dataIndex: 'useType',
  filters: Object.values(useTypes).map((item) => ({
    text: item.name,
    value: item.id,
  })),
}

const getOrderPayedRow = (confirmPay) =>
  getCustomRow('订单支付情况', (record) => {
    if (record.isPayed) {
      return <div>已支付</div>
    }
    return (
      <Button type="primary" onClick={() => confirmPay(record.id)}>
        确认支付
      </Button>
    )
  })

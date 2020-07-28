import React from 'react'
import { formatTime } from 'src/utils/common'
import JjtAvatar from 'src/components/Avatar'
import { Divider, Switch } from 'antd'
import { FeeType, FeeStatus } from 'src/utils/const'

export const getColumns = (editService, updateService, deleteService) => [
  {
    title: '序号',
    key: 'index',
    render: (text, record, index) => `${index + 1}`,
  },
  {
    title: '名称',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '学校',
    dataIndex: 'schoolName',
    key: 'schoolName',
  },
  {
    title: '状态',
    key: 'isEnable',
    render: (text, record) => {
      return (
        <Switch
          disabled={true}
          checkedChildren="启用"
          unCheckedChildren="禁用"
          checked={record.isEnable}
        />
      )
    },
  },
  {
    title: '开通期限',
    key: 'startTime',
    render: (text, record) => {
      return (
        <span>
          {formatTime(record.startTime, 'YYYY.MM.DD')}-
          {formatTime(record.finishTime, 'YYYY.MM.DD')}
        </span>
      )
    },
  },
  {
    title: '支付类型',
    key: 'feeType',
    render: (text, record) => {
      if (record.feeType === FeeType.fullPay.id) {
        return <span>{FeeType.fullPay.title}</span>
      }
      return <span>{FeeType.commissionPay.title}</span>
    },
  },
  {
    title: '支付状态',
    key: 'currState',
    render: (text, record) => {
      if (record.feeType === FeeType.fullPay.id) {
        return (
          <span>
            <Switch
              disabled={true}
              checkedChildren="已支付"
              unCheckedChildren="未支付"
              checked={record.currState === FeeStatus.fullPayPaid}
            />
          </span>
        )
      }
      return <span>-</span>
    },
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <>
        <span className="table-action" onClick={() => editService(record)}>
          编辑
        </span>
        <Divider type="vertical" />
        <span className="table-action" onClick={() => updateService(record)}>
          {record.isEnable ? '关闭服务' : '开通服务'}
        </span>
        <Divider type="vertical" />
        <span className="table-action" onClick={() => deleteService(record)}>
          删除
        </span>
      </>
    ),
  },
]

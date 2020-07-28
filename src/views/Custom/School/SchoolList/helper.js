import React from 'react'
import { formatTime } from 'src/utils/common'
import JjtAvatar from 'src/components/Avatar'
import { Divider, Switch } from 'antd'

export const getColumns = (editSchool, deleteSchool) => [
  {
    title: '序号',
    key: 'index',
    render: (text, record, index) => `${index + 1}`,
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '头像',
    key: 'logoUrl',
    render: (text, record) => {
      if (!record.logoUrl) return null
      return <JjtAvatar shape="square" size={50} src={record.logoUrl} />
    },
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
    title: '开通期数',
    dataIndex: 'serviceSpanCount',
    key: 'serviceSpanCount',
  },
  {
    title: '联系人',
    dataIndex: 'linkMan',
    key: 'linkMan',
  },
  {
    title: '联系人电话',
    dataIndex: 'linkPhone',
    key: 'linkPhone',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    render: (text, record) => <span>{formatTime(record.createTime)}</span>,
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <>
        <span className="table-action" onClick={() => editSchool(record)}>
          编辑
        </span>
        <Divider type="vertical" />
        <span className="table-action" onClick={() => deleteSchool(record)}>
          删除
        </span>
      </>
    ),
  },
]

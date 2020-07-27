import React from 'react'
import { formatTime } from 'src/utils/common'
import JjtAvatar from 'src/components/Avatar'
import { Divider } from 'antd'

export const getColumns = (editAdmin, deleteAdmin) => [
  {
    title: '序号',
    key: 'index',
    render: (text, record, index) => `${index + 1}`,
  },
  {
    title: '姓名',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    key: 'nickname',
  },
  {
    title: '头像',
    key: 'faceUrl',
    render: (text, record) => {
      if (!record.faceUrl) return null
      return <JjtAvatar shape="square" size={50} src={record.faceUrl} />
    },
  },
  {
    title: '电话',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '状态',
    key: 'isEnable',
    render: (text, record) => {
      return <span>{record.isEnable ? '已启用' : '未启用'}</span>
    },
  },
  {
    title: '学校',
    dataIndex: 'schoolName',
    key: 'schoolName',
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
        <span className="table-action" onClick={() => editAdmin(record)}>
          编辑
        </span>
        <Divider type="vertical" />
        <span className="table-action" onClick={() => deleteAdmin(record)}>
          删除
        </span>
      </>
    ),
  },
]

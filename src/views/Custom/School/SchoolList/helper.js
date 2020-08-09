import React from 'react'
import { copyToClipboard, formatTime } from 'src/utils/common'
import JjtAvatar from 'src/components/Avatar'
import { Divider, Switch } from 'antd'
import Button from 'antd/es/button'

export const getColumns = (
  editSchool,
  updateSchool,
  createServiceOrAdmin,
  deleteSchool
) => [
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
          onChange={() => updateSchool(record)}
          checkedChildren="启用"
          unCheckedChildren="禁用"
          checked={record.isEnable}
        />
      )
    },
  },
  {
    title: '学校链接',
    dataIndex: 'hashCode',
    key: 'hashCode',
    render: (text, record) => {
      const link = `${process.env.REACT_APP_SCHOOL_ADMIN_URL}${record.hashCode}`
      return (
        <span>
          <Button
            style={{ marginRight: '5px' }}
            size="small"
            onClick={() => window.open(link, '_blank')}
          >
            打开
          </Button>
          <Button
            style={{ marginRight: '5px' }}
            size="small"
            onClick={() => copyToClipboard(link)}
          >
            复制
          </Button>
        </span>
      )
    },
  },
  {
    title: '管理员人数',
    dataIndex: 'adminCount',
    key: 'adminCount',
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
      <div>
        <div>
          <span className="table-action" onClick={() => editSchool(record)}>
            编辑
          </span>
          <Divider type="vertical" />
          <span
            className="table-action"
            onClick={() => createServiceOrAdmin(record, 'serviceSpan')}
          >
            创建服务
          </span>
        </div>
        <div>
          <span
            className="table-action"
            onClick={() => createServiceOrAdmin(record, 'user')}
          >
            创建管理员
          </span>
          <Divider type="vertical" />
          <span className="table-action" onClick={() => deleteSchool(record)}>
            删除
          </span>
        </div>
      </div>
    ),
  },
]

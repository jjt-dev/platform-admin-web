import { Button, Divider, Switch } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { formatTime } from './common'

export const tableOrder = {
  title: '序号',
  key: 'index',
  render: (text, record, index) => `${index + 1}`,
}

export const getRow = (title, name, width) => ({
  title,
  dataIndex: name,
  key: name,
  width,
})

export const getDateRow = (title, name) => ({
  title,
  dataIndex: name,
  key: name,
  render: (text, record) => <span>{formatTime(record[name])}</span>,
})

export const getLinkRow = (title, link, placeholderNames) => {
  return {
    title,
    render: (text, record) => {
      let finalLink = link
      placeholderNames.forEach((item) => {
        finalLink = finalLink.replace('::', record[item])
      })
      return <Link to={finalLink}>查看</Link>
    },
  }
}

export const getEnableRow = () => ({
  title: '已启用',
  dataIndex: 'isEnable',
  key: 'isEnable',
  render: (text, record) => <span>{record.isEnable ? '是' : '否'}</span>,
})

export const getSwitchRow = (update, title) => ({
  title: title ?? '状态',
  key: 'isEnable',
  render: (text, record) => {
    return (
      <Switch
        onChange={() => update(record)}
        checkedChildren="启用"
        unCheckedChildren="禁用"
        checked={record.isEnable}
      />
    )
  },
})

export const getActionRow = (getPath, deleteEntity) => ({
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <>
      <Link to={getPath(record)}>编辑</Link>
      {deleteEntity && (
        <>
          <Divider type="vertical" />
          <span
            className="table-action"
            onClick={() => {
              deleteEntity(record)
            }}
          >
            删除
          </span>
        </>
      )}
    </>
  ),
})

export const getViewRow = (title, callback) => ({
  title,
  render: (text, record) => {
    return (
      <span>
        <Button size="small" onClick={() => callback(record)}>
          查看{title}
        </Button>
      </span>
    )
  },
})

export const getDeleteRow = (deleteEntity) => ({
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span
      className="table-action"
      onClick={() => {
        deleteEntity(record)
      }}
    >
      删除
    </span>
  ),
})

export const getDetailRow = (getPath) => ({
  title: '操作',
  key: 'action',
  render: (text, record) => <Link to={getPath(record)}>详情</Link>,
})

export const getCustomRow = (title, getValue, width) => ({
  title,
  width,
  render: (text, record) => <span>{getValue(record)}</span>,
})

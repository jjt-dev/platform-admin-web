import { Avatar } from 'antd'
import React from 'react'
import { useParams } from 'react-router'
import PageList from 'src/components/PageList'
import useActiveRoute from 'src/hooks/useActiveRoute'
import useTableFetch from 'src/hooks/useTableFetch'
import { getDomain } from 'src/utils/common'
import {
  getActionRow,
  getCustomRow,
  getRow,
  getSwitchRow,
  tableOrder,
} from 'src/utils/tableUtil'

const CourseAssociationList = () => {
  const { courseId, name } = useParams()
  const { apiPath } = useActiveRoute()
  const courseAssociationList = useTableFetch(`${apiPath}/page`, { courseId })
  const addItemPath = `/system/course/${courseId}/${name}/association/edit`
  return (
    <PageList
      columns={getColumns(addItemPath)}
      defaultTableList={courseAssociationList}
      title={`${name}协会`}
      addCallback={addItemPath}
      size="small"
    />
  )
}

export default CourseAssociationList

const getColumns = (addItemPath) => (deleteEntity, updateStatus) => [
  tableOrder,
  getRow('名称', 'name'),
  getCustomRow('logo', (record) => (
    <Avatar size={45} src={`${getDomain()}${record.logUrl}`} shape="square" />
  )),
  getSwitchRow(updateStatus),
  getActionRow((record) => `${addItemPath}/${record.id}`, deleteEntity),
]

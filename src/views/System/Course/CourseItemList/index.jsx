import React from 'react'
import { useParams } from 'react-router'
import PageList from 'src/components/PageList'
import useActiveRoute from 'src/hooks/useActiveRoute'
import useTableFetch from 'src/hooks/useTableFetch'
import { getActionRow, getRow, getSwitchRow } from 'src/utils/tableUtil'

const CourseItemList = () => {
  const { courseId, name } = useParams()
  const { apiPath } = useActiveRoute()
  const courseItemList = useTableFetch(`${apiPath}/page`, { courseId })
  const addItemPath = `/system/course/${courseId}/${name}/item/edit`
  return (
    <PageList
      columns={getColumns(addItemPath)}
      defaultTableList={courseItemList}
      title={`${name}考核项目`}
      addCallback={addItemPath}
    />
  )
}

export default CourseItemList

const getColumns = (addItemPath) => (deleteEntity, updateStatus) => [
  getRow('序号', 'sortOrder'),
  getRow('名称', 'name'),
  getRow('默认差评', 'defaultBadComment'),
  getSwitchRow(updateStatus),
  getActionRow((record) => `${addItemPath}/${record.id}`, deleteEntity),
]

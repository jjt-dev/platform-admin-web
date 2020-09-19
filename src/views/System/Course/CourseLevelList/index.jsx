import React from 'react'
import { useParams } from 'react-router'
import PageList from 'src/components/PageList'
import useActiveRoute from 'src/hooks/useActiveRoute'
import useTableFetch from 'src/hooks/useTableFetch'
import { getActionRow, getRow, getCustomRow } from 'src/utils/tableUtil'

const CourseLevelList = () => {
  const { courseId, name } = useParams()
  const { apiPath } = useActiveRoute()
  const courseItemList = useTableFetch(`${apiPath}/page`, { courseId })
  const addItemPath = `/system/course/${courseId}/${name}/level/edit`
  return (
    <PageList
      columns={getColumns(addItemPath)}
      defaultTableList={courseItemList}
      title={`${name}考试等级`}
      addCallback={addItemPath}
    />
  )
}

export default CourseLevelList

const getColumns = (addItemPath) => (deleteEntity) => [
  getRow('序号', 'sortOrder'),
  getRow('名称', 'name'),
  getRow('别名', 'alias'),
  getCustomRow('价格', (record) => `${record.price}元`),
  getActionRow((record) => `${addItemPath}/${record.id}`, deleteEntity),
]

import React from 'react'
import { useParams } from 'react-router'
import PageList from 'src/components/PageList'
import useActiveRoute from 'src/hooks/useActiveRoute'
import useTableFetch from 'src/hooks/useTableFetch'
import { getActionRow, getRow, tableOrder } from 'src/utils/tableUtil'

const CourseGradeList = () => {
  const { courseId, name } = useParams()
  const { apiPath } = useActiveRoute()
  const courseItemList = useTableFetch(`${apiPath}/page`, { courseId })
  const addItemPath = `/system/course/${courseId}/${name}/grade/edit`
  return (
    <PageList
      columns={getColumns(addItemPath)}
      defaultTableList={courseItemList}
      title={`${name}打分等级`}
      addCallback={addItemPath}
    />
  )
}

export default CourseGradeList

const getColumns = (addItemPath) => (deleteEntity) => [
  tableOrder,
  getRow('等级名称', 'name'),
  getRow('起始分数', 'startScore'),
  getRow('截止分数', 'endScore'),
  getRow('背景颜色值', 'bgColor'),
  getActionRow((record) => `${addItemPath}/${record.id}`, deleteEntity),
]

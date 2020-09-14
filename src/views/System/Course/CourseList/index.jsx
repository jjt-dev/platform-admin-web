import React from 'react'
import PageList from 'src/components/PageList'
import {
  getActionRow,
  getCustomRow,
  getRow,
  getSwitchRow,
  tableOrder,
} from 'src/utils/tableUtil'

const CourseList = () => {
  return <PageList columns={getColumns} />
}

export default CourseList

const getColumns = (deleteAgent, updateAgentStatus) => [
  tableOrder,
  getRow('名称', 'name'),
  getRow('创建人', 'creatorName'),
  getCustomRow('考试时间', (record) => `${record.examDuration}秒`),
  getSwitchRow(updateAgentStatus),
  getActionRow((record) => `/system/course/edit/${record.id}`, deleteAgent),
]

import React from 'react'
import PageList from 'src/components/PageList'
import {
  getActionRow,
  getCustomRow,
  getRow,
  getSwitchRow,
  tableOrder,
  getLinkRow,
} from 'src/utils/tableUtil'
import * as appAction from 'src/actions/app'
import { useDispatch } from 'react-redux'

const CourseList = () => {
  const dispatch = useDispatch()
  const getAllCourses = () => dispatch(appAction.getAllCourses())

  return <PageList columns={getColumns} updateCallback={getAllCourses} />
}

export default CourseList

const getColumns = (deleteAgent, updateAgentStatus) => [
  tableOrder,
  getRow('名称', 'name'),
  getRow('创建人', 'creatorName'),
  getCustomRow('考试时间', (record) => `${record.examDuration}秒`),
  getLinkRow('考核项目', `/system/course/:id/:name/item/list`),
  getLinkRow('考试等级', `/system/course/:id/:name/level/list`),
  getLinkRow('打分等级体系', `/system/course/:id/:name/grade/list`),
  getSwitchRow(updateAgentStatus),
  getActionRow((record) => `/system/course/edit/${record.id}`, deleteAgent),
]

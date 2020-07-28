import React from 'react'
import './index.less'
import CustomTable from 'src/components/CustomTable'
import { getColumns } from './helper'
import { confirmUpdate } from 'src/utils/common'
import ListHeader from 'src/components/ListHeader'

const { useTableFetch } = CustomTable

const SchoolList = ({ history }) => {
  const shoolList = useTableFetch(`/client/school/page`)

  const deleteSchool = (school) => {
    const entity = {
      status: '删除',
      title: '学校',
      titleValue: school.name,
      path: `/client/school/del?id=${school.id}`,
      callback: () => shoolList.fetchTable(),
    }
    confirmUpdate(entity)
  }

  const editSchool = (school) => {
    history.push(`/school/edit/${school.id}`)
  }

  const createService = (school) => {
    history.push(`/school/serviceSpan/edit?schoolId=${school.id}`)
  }

  return (
    <div className="page page-list school-list">
      <div className="page-list__title">学校列表</div>
      <ListHeader
        fetchTable={shoolList.fetchTable}
        path="/school/edit"
        placeholder="请输入名称或联系方式"
      />
      <CustomTable
        {...shoolList}
        columns={getColumns(editSchool, createService, deleteSchool)}
        rowKey="id"
      />
    </div>
  )
}

export default SchoolList

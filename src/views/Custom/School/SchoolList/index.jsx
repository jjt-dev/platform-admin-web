import React from 'react'
import './index.less'
import CustomTable from 'src/components/CustomTable'
import { getColumns } from './helper'
import { confirmDelete } from 'src/utils/common'

const { useTableFetch } = CustomTable

const SchoolList = ({ history }) => {
  const shoolList = useTableFetch(`/client/school/page`)

  const deleteSchool = (school) => {
    const entity = {
      title: '学校',
      titleValue: school.name,
      path: `/client/school/del?id=${school.id}`,
      callback: () => shoolList.fetchTable(),
    }
    confirmDelete(entity)
  }

  return (
    <div className="page page-list school-list">
      <div className="page-list__title">学校列表</div>
      <CustomTable
        {...shoolList}
        columns={getColumns(deleteSchool)}
        rowKey="id"
      />
    </div>
  )
}

export default SchoolList

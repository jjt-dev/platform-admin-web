import React from 'react'
import './index.less'
import CustomTable from 'src/components/CustomTable'
import { getColumns } from './helper'
import { confirmUpdate } from 'src/utils/common'
import ListHeader from 'src/components/ListHeader'

const { useTableFetch } = CustomTable

const AgentList = ({ history }) => {
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

  const updateSchoolStatus = (school) => {
    const { isEnable } = school
    const entity = {
      status: isEnable ? '禁用' : '启用',
      title: '学校',
      titleValue: school.name,
      path: `/client/school/enable?id=${school.id}&isEnable=${!isEnable}`,
      callback: () => shoolList.fetchTable(),
    }
    confirmUpdate(entity)
  }

  const editSchool = (school) => {
    history.push(`/school/edit/${school.id}`)
  }

  const createServiceOrAdmin = (school, type) => {
    history.push(`/school/${type}/edit?schoolId=${school.id}`)
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
        columns={getColumns(
          editSchool,
          updateSchoolStatus,
          createServiceOrAdmin,
          deleteSchool
        )}
        rowKey="id"
      />
    </div>
  )
}

export default AgentList

import React from 'react'
import './index.less'
import CustomTable from 'src/components/CustomTable'
import { getColumns } from './helper'
import { confirmDelete } from 'src/utils/common'
import ListHeader from 'src/components/ListHeader'

const { useTableFetch } = CustomTable

const SchoolAdminList = ({ history }) => {
  const shoolAdmins = useTableFetch(`/client/school/admin/page`)

  const deleteAdmin = (admin) => {
    const entity = {
      title: '学校管理员',
      titleValue: admin.name,
      path: `/client/school/admin/del?id=${admin.id}`,
      callback: () => shoolAdmins.fetchTable(),
    }
    confirmDelete(entity)
  }

  const editAdmin = (admin) => {
    history.push(`/school/user/${admin.id}`)
  }

  return (
    <div className="page page-list school-admin-list">
      <div className="page-list__title">管理员列表</div>
      <ListHeader
        fetchTable={shoolAdmins.fetchTable}
        path="/school/user"
        placeholder="请输入名称或联系方式"
      />
      <CustomTable
        {...shoolAdmins}
        columns={getColumns(editAdmin, deleteAdmin)}
        rowKey="id"
      />
    </div>
  )
}

export default SchoolAdminList

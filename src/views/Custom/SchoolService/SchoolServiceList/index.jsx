import React from 'react'
import './index.less'
import CustomTable from 'src/components/CustomTable'
import { getColumns } from './helper'
import { confirmDelete } from 'src/utils/common'
import ListHeader from 'src/components/ListHeader'

const { useTableFetch } = CustomTable

const SchoolServiceList = ({ history }) => {
  const shoolServices = useTableFetch(`/client/school/serviceSpan/page`)

  const deleteService = (service) => {
    const entity = {
      title: '服务期限',
      titleValue: service.name,
      path: `/client/school/serviceSpan/del?id=${service.id}`,
      callback: () => shoolServices.fetchTable(),
    }
    confirmDelete(entity)
  }

  const editService = (service) => {
    history.push(`/school/serviceSpan/edit/${service.id}`)
  }

  return (
    <div className="page page-list school-service-list">
      <div className="page-list__title">服务期限列表</div>
      <ListHeader
        fetchTable={shoolServices.fetchTable}
        path="/school/serviceSpan/edit"
        placeholder="请输入名称或联系方式"
      />
      <CustomTable
        {...shoolServices}
        columns={getColumns(editService, deleteService)}
        rowKey="id"
      />
    </div>
  )
}

export default SchoolServiceList

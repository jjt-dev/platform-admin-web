import React from 'react'
import './index.less'
import CustomTable from 'src/components/CustomTable'
import { getColumns } from './helper'
import { confirmUpdate } from 'src/utils/common'
import ListHeader from 'src/components/ListHeader'

const { useTableFetch } = CustomTable

const SchoolServiceList = ({ history }) => {
  const shoolServices = useTableFetch(`/client/school/serviceSpan/page`)

  const deleteService = (service) => {
    const entity = {
      status: '删除',
      title: '服务期限',
      titleValue: service.name,
      path: `/client/school/serviceSpan/del?id=${service.id}`,
      callback: () => shoolServices.fetchTable(),
    }
    confirmUpdate(entity)
  }

  const updateServiceStatus = (service) => {
    const { isEnable } = service
    const entity = {
      status: isEnable ? '关闭' : '开通',
      title: '服务',
      titleValue: service.title,
      path: `/client/school/serviceSpan/enable?id=${
        service.id
      }&isEnable=${!isEnable}`,
      callback: () => shoolServices.fetchTable(),
    }
    confirmUpdate(entity)
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
        columns={getColumns(editService, updateServiceStatus, deleteService)}
        rowKey="id"
      />
    </div>
  )
}

export default SchoolServiceList

import React, { useState } from 'react'
import './index.less'
import CustomTable from 'src/components/CustomTable'
import { getColumns } from './helper'
import { confirmUpdate } from 'src/utils/common'
import ListHeader from 'src/components/ListHeader'
import ChangePwd from 'src/components/ChangePwd'
import api from 'src/utils/api'
import { message } from 'antd'

const { useTableFetch } = CustomTable

const SchoolAdminList = ({ history }) => {
  const [adminToChangePwd, setAdminToChangePwd] = useState()
  const shoolAdmins = useTableFetch(`/client/school/admin/page`)

  const deleteAdmin = (admin) => {
    const entity = {
      status: '删除',
      title: '学校管理员',
      titleValue: admin.name,
      path: `/client/school/admin/del?id=${admin.id}`,
      callback: () => shoolAdmins.fetchTable(),
    }
    confirmUpdate(entity)
  }

  const updateAdminStatus = (admin) => {
    const { isEnable } = admin
    const entity = {
      status: isEnable ? '禁用' : '启用',
      title: '管理员',
      titleValue: admin.username,
      path: `/client/school/admin/enable?id=${admin.id}&isEnable=${!isEnable}`,
      callback: () => shoolAdmins.fetchTable(),
    }
    confirmUpdate(entity)
  }

  const editAdmin = (admin) => {
    history.push(`/school/user/edit/${admin.id}`)
  }

  const changePassword = async (newPassword) => {
    await api.post(
      `/user/admin/changePsw?id=${adminToChangePwd.id}&psw=${newPassword}`
    )
    message.success('学校管理员密码修改成功。')
    setAdminToChangePwd(false)
  }

  return (
    <div className="page page-list school-admin-list">
      <div className="page-list__title">管理员列表</div>
      <ListHeader
        fetchTable={shoolAdmins.fetchTable}
        path="/school/user/edit"
        placeholder="请输入名称或联系方式"
      />
      <CustomTable
        {...shoolAdmins}
        columns={getColumns(
          editAdmin,
          updateAdminStatus,
          setAdminToChangePwd,
          deleteAdmin
        )}
        rowKey="id"
      />
      {adminToChangePwd && (
        <ChangePwd
          setVisible={setAdminToChangePwd}
          title={`学校管理员${adminToChangePwd.username}`}
          changePassword={changePassword}
        />
      )}
    </div>
  )
}

export default SchoolAdminList

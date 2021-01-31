import { message, Modal, Table } from 'antd'
import React, { useState } from 'react'
import { useParams } from 'react-router'
import PageList from 'src/components/PageList'
import useActiveRoute from 'src/hooks/useActiveRoute'
import useFetch from 'src/hooks/useFetch'
import useTableFetch from 'src/hooks/useTableFetch'
import api from 'src/utils/api'
import { buildFormPath } from 'src/utils/common'
import {
  getActionRow,
  getRow,
  getCustomRow,
  tableOrder,
} from 'src/utils/tableUtil'

const CourseLevelList = () => {
  const { courseId, name } = useParams()
  const { apiPath } = useActiveRoute()
  const courseItemList = useTableFetch(`${apiPath}/page`, { courseId })
  const addItemPath = `/system/course/${courseId}/${name}/level/edit`
  const [selectedLevel, setSelectedLevel] = useState()

  return (
    <>
      <PageList
        columns={getColumns(addItemPath, setSelectedLevel)}
        defaultTableList={courseItemList}
        title={`${name}考试等级`}
        addCallback={addItemPath}
      />
      {selectedLevel && (
        <DefaultItems
          fetchLevels={courseItemList.fetchTable}
          courseId={courseId}
          level={selectedLevel}
          hide={() => setSelectedLevel(null)}
        />
      )}
    </>
  )
}

export default CourseLevelList

const getColumns = (addItemPath, setSelectedLevel) => (deleteEntity) => [
  getRow('序号', 'sortOrder'),
  getRow('名称', 'name'),
  getRow('别名', 'alias'),
  getCustomRow('价格', (record) => `${record.price}元`),
  getCustomRow('默认考项', (record) => (
    <span className="table-action" onClick={() => setSelectedLevel(record)}>
      查看
    </span>
  )),
  getActionRow((record) => `${addItemPath}/${record.id}`, deleteEntity),
]

const DefaultItems = ({ courseId, level, hide, fetchLevels }) => {
  const [result] = useFetch(
    `/config/course/item/page?courseId=${courseId}&rows=10000&page=1`
  )
  const [selectedKeys, setSelectedKeys] = useState(
    level.examItems.map((item) => item.id)
  )

  const onChange = (keys) => setSelectedKeys(keys)

  const updateItems = async () => {
    await api.post(
      buildFormPath(`/config/course/level/bindDefaultExamItems`, {
        id: level.id,
        itemIds: selectedKeys.join(','),
      })
    )
    message.success('更新等级绑定的考项成功')
    hide()
    fetchLevels()
  }

  if (!result) return null

  const columns = [
    tableOrder,
    getRow('考项', 'name'),
    getRow('默认差评', 'defaultBadComment'),
  ]

  return (
    <Modal
      width={600}
      title={`${level.courseName}${level.name}绑定的默认考项`}
      visible={true}
      onOk={updateItems}
      onCancel={hide}
    >
      <Table
        rowSelection={{
          selectedRowKeys: selectedKeys,
          onChange,
        }}
        columns={columns}
        dataSource={result.data}
        rowKey="id"
        size="small"
        pagination={false}
      />
    </Modal>
  )
}

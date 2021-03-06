import { List, Card } from 'antd'
import React from 'react'
import useFetch from 'src/hooks/useFetch'
import './index.less'

const Console = () => {
  const [data] = useFetch(`/common/data/data1`)

  if (!data) return null

  return (
    <div className="page console">
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 5,
          xxl: 3,
        }}
        dataSource={stats}
        renderItem={(item) => (
          <List.Item>
            <div className="console-card"></div>
          </List.Item>
        )}
      />
    </div>
  )
}

export default Console

const stats = [
  {
    id: 'totalAgentCount',
    label: '代理总数',
  },
  {
    id: 'totalSchoolCount',
    label: '学校总数',
  },
  {
    id: 'totalSoldExamCount',
    label: '售出考试名额',
  },
  {
    id: 'totalSoldUploadCount',
    label: '售出上传(中跆协)名额',
  },
  {
    id: 'examedTotalCount',
    label: '考试总人数',
  },
  {
    id: 'examedTotalCountOfMonth',
    label: '最近一个月考试总人数',
  },
  {
    id: 'excutedExamRoundTotalCount',
    label: '完成场次总数',
  },
  {
    id: 'excutedExamRoundTotalCountOfMonth',
    label: '最近一个月完成场次总数',
  },
  {
    id: 'totalSignLevelCount',
    label: '报名总人数',
  },
  {
    id: 'totalStudentCount',
    label: '考生总人数',
  },
  {
    id: 'studentCountOfToday',
    label: '当日报名总人数',
  },
  {
    id: 'examStudentCountOfToday',
    label: '当日考试总人数',
  },
  {
    id: 'examedStudentCountOfToday',
    label: '当日完成考试总人数',
  },
]

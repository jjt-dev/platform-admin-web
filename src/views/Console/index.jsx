import './index.less'

import {
  AppstoreOutlined,
  BankOutlined,
  BarChartOutlined,
  CrownOutlined,
  DashboardOutlined,
  DesktopOutlined,
  DingtalkOutlined,
  FileDoneOutlined,
  NotificationOutlined,
  PartitionOutlined,
  ProjectOutlined,
  SmileOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { List } from 'antd'
import React from 'react'
import useFetch from 'src/hooks/useFetch'

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
            <div className="console-card">
              <div className="console-card-icon">{item.icon}</div>
              <div className="console-card-stats">
                <div>{item.label}</div>
                <div>{data[item.id] ?? 0}</div>
              </div>
            </div>
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
    icon: <AppstoreOutlined />,
  },
  {
    id: 'totalSchoolCount',
    label: '学校总数',
    icon: <BankOutlined />,
  },
  {
    id: 'totalSoldExamCount',
    label: '售出考试名额',
    icon: <FileDoneOutlined />,
  },
  {
    id: 'totalSoldUploadCount',
    label: '售出上传(中跆协)名额',
    icon: <NotificationOutlined />,
  },
  {
    id: 'examedTotalCount',
    label: '考试总人数',
    icon: <UserOutlined />,
  },
  {
    id: 'examedTotalCountOfMonth',
    label: '最近一个月考试总人数',
    icon: <SmileOutlined />,
  },
  {
    id: 'excutedExamRoundTotalCount',
    label: '完成场次总数',
    icon: <ProjectOutlined />,
  },
  {
    id: 'excutedExamRoundTotalCountOfMonth',
    label: '最近一个月完成场次总数',
    icon: <PartitionOutlined />,
  },
  {
    id: 'totalSignLevelCount',
    label: '报名总人数',
    icon: <BarChartOutlined />,
  },
  {
    id: 'totalStudentCount',
    label: '考生总人数',
    icon: <DingtalkOutlined />,
  },
  {
    id: 'studentCountOfToday',
    label: '当日报名总人数',
    icon: <DesktopOutlined />,
  },
  {
    id: 'examStudentCountOfToday',
    label: '当日考试总人数',
    icon: <CrownOutlined />,
  },
  {
    id: 'examedStudentCountOfToday',
    label: '当日完成考试总人数',
    icon: <DashboardOutlined />,
  },
]

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
import { List, Tabs } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import api from 'src/utils/api'
import * as appAction from 'src/actions/app'

const { TabPane } = Tabs

const Console = () => {
  const dispatch = useDispatch()
  const { allCourses } = useSelector((state) => state.app)
  const [courseId, setCourseId] = useState()
  const [stats, setStats] = useState()

  useEffect(() => {
    if (allCourses.length > 0) {
      setCourseId(allCourses[0].id)
    }
  }, [allCourses])

  useEffect(() => {
    const fetcher = async () => {
      dispatch(appAction.showLoadingBar())
      setTimeout(() => {
        dispatch(appAction.closeLoadingBar())
      }, 1000)
      const result = await api.get(`/common/data/data1?courseId=${courseId}`)
      setStats(result)
    }
    if (courseId) {
      fetcher()
    }
  }, [courseId, dispatch])

  const getList = () => (
    <List
      grid={grid}
      dataSource={items}
      renderItem={(item, index) => (
        <List.Item>
          <div className="console-card">
            <div className={`console-card-icon console-card-icon-${index % 5}`}>
              {item.icon}
            </div>
            <div className="console-card-stats">
              <div>{item.label}</div>
              <div className="console-card-stats-number">
                {stats[item.id] ?? 0}
              </div>
            </div>
          </div>
        </List.Item>
      )}
    />
  )

  if (!stats || !courseId) return null

  return (
    <div className="page console">
      <Tabs defaultActiveKey={courseId} type="card" onChange={setCourseId}>
        {allCourses.map((course) => (
          <TabPane tab={course.name} key={course.id}>
            {getList()}
          </TabPane>
        ))}
      </Tabs>
    </div>
  )
}

export default Console

const items = [
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

const grid = {
  gutter: 16,
  xs: 1,
  sm: 2,
  md: 4,
  lg: 4,
  xl: 5,
  xxl: 3,
}

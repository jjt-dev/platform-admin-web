import React from 'react'
import { Redirect, Switch } from 'react-router'
import { Route } from 'react-router-dom'
import AgentList from './Custom/Agent/AgentList'
import Agent from './Custom/Agent/Agent'
import Login from './Login'
import AgentAdminList from './Custom/Agent/AgentAdmin/AgentAdminList'
import AgentAdmin from './Custom/Agent/AgentAdmin/AgentAdmin'
import AgentLevel from './System/AgentLevel'
import AgentOrderList from './Custom/Agent/AgentOrder/AgentOrderList'
import AgentOrder from './Custom/Agent/AgentOrder/AgentOrder'
import AgentAccount from './Custom/Agent/AgentAccount'
import CourseList from './System/Course/CourseList'
import Course from './System/Course/Course'
import CourseItemList from './System/Course/CourseItemList'
import CourseItem from './System/Course/CourseItem'
import CourseGradeList from './System/Course/CourseGradeList'
import CourseGrade from './System/Course/CourseGrade'
import CourseLevelList from './System/Course/CourseLevelList'
import CourseLevel from './System/Course/CourseLevel'

export const routes = [
  {
    path: '/agent/list',
    editPath: '/agent/edit',
    menuPath: '/agent/list',
    apiPath: '/client/agent',
    title: '代理商',
    comp: AgentList,
  },
  {
    path: '/agent/edit',
    menuPath: '/agent/list',
    apiPath: '/client/agent',
    title: '代理商',
    comp: Agent,
    back: {
      path: '/agent/list',
      breadcrumbs: ['代理商列表', '新增代理商'],
    },
  },
  {
    path: '/agent/edit/:id',
    menuPath: '/agent/list',
    apiPath: '/client/agent',
    title: '代理商',
    comp: Agent,
    back: {
      path: '/agent/list',
      breadcrumbs: ['代理商列表', '编辑代理商'],
    },
  },
  {
    path: '/agent/:agentId/:agent/admin/list',
    menuPath: '/agent/list',
    apiPath: '/client/agent/admin',
    titleProp: 'username',
    title: '管理员',
    comp: AgentAdminList,
    back: {
      path: '/agent/list',
      breadcrumbs: ['代理商列表', '管理员列表'],
    },
  },
  {
    path: '/agent/:agentId/:agentName/admin/edit',
    menuPath: '/agent/list',
    apiPath: '/client/agent/admin',
    title: '管理员',
    comp: AgentAdmin,
    back: {
      path: '/agent/:agentId/:agentName/admin/list',
      params: ['agentId', 'agentName'],
      breadcrumbs: ['代理商列表', '管理员列表', '新增管理员'],
    },
  },
  {
    path: '/agent/:agentId/:agentName/admin/edit/:id',
    menuPath: '/agent/list',
    apiPath: '/client/agent/admin',
    title: '管理员',
    comp: AgentAdmin,
    back: {
      path: '/agent/:agentId/:agentName/admin/list',
      params: ['agentId', 'agentName'],
      breadcrumbs: ['代理商列表', '管理员列表', '编辑管理员'],
    },
  },
  {
    path: '/agent/:agentId/:agent/order/list',
    menuPath: '/order/list',
    apiPath: '/client/agent/account/orders',
    title: '订单',
    comp: AgentOrderList,
    back: {
      path: '/agent/list',
      breadcrumbs: ['代理商列表', '订单列表'],
    },
  },
  {
    path: '/agent/:agentId/:agentName/order/edit',
    menuPath: '/agent/list',
    apiPath: '/client/agent/account/orders',
    title: '订单',
    comp: AgentOrder,
    back: {
      path: '/agent/:agentId/:agentName/order/list',
      params: ['agentId', 'agentName'],
      breadcrumbs: ['代理商列表', '订单列表', '新增订单'],
    },
  },
  {
    path: '/agent/:agentId/:agentName/order/edit/:id',
    menuPath: '/agent/list',
    apiPath: '/client/agent/account/orders',
    title: '订单',
    comp: AgentOrder,
    back: {
      path: '/agent/:agentId/:agentName/order/list',
      params: ['agentId', 'agentName'],
      breadcrumbs: ['代理商列表', '订单列表', '编辑订单'],
    },
  },
  {
    path: '/agent/:agentId/:agentName/account',
    menuPath: '/agent/list',
    comp: AgentAccount,
    back: {
      path: '/agent/list',
      params: ['agentId', 'agentName'],
      breadcrumbs: ['代理商列表', '代理商账户信息'],
    },
  },
  {
    path: '/system/agent-level',
    menuPath: '/system/agent-level',
    apiPath: '/client/agent/admin',
    title: '代理级别',
    comp: AgentLevel,
  },
  {
    path: '/system/course/list',
    editPath: '/system/course/edit',
    menuPath: '/system/course/list',
    apiPath: '/config/course',
    title: '学科',
    comp: CourseList,
  },
  {
    path: '/system/course/edit',
    menuPath: '/system/course/list',
    apiPath: '/config/course',
    title: '学科',
    comp: Course,
    back: {
      path: '/system/course/list',
      breadcrumbs: ['学科列表', '新增学科'],
    },
  },
  {
    path: '/system/course/edit/:id',
    menuPath: '/system/course/list',
    apiPath: '/config/course',
    title: '学科',
    comp: Course,
    back: {
      path: '/system/course/list',
      breadcrumbs: ['学科列表', '编辑学科'],
    },
  },
  {
    path: '/system/course/:courseId/:name/item/list',
    menuPath: '/system/course/list',
    apiPath: '/config/course/item',
    title: '学科考项',
    comp: CourseItemList,
    back: {
      path: '/system/course/list',
      breadcrumbs: ['学科列表', '考核项目'],
    },
  },
  {
    path: '/system/course/:courseId/:name/item/edit',
    menuPath: '/system/course/list',
    apiPath: '/config/course/item',
    title: '学科考项',
    comp: CourseItem,
    back: {
      path: '/system/course/:courseId/:name/item/list',
      params: ['courseId', 'name'],
      breadcrumbs: ['学科列表', '考核项目', '新增考项'],
    },
  },
  {
    path: '/system/course/:courseId/:name/item/edit/:id',
    menuPath: '/system/course/list',
    apiPath: '/config/course/item',
    title: '学科考项',
    comp: CourseItem,
    back: {
      path: '/system/course/:courseId/:name/item/list',
      params: ['courseId', 'name'],
      breadcrumbs: ['学科列表', '考核项目', '编辑考项'],
    },
  },
  {
    path: '/system/course/:courseId/:name/grade/list',
    menuPath: '/system/course/list',
    apiPath: '/config/course/grade',
    title: '打分等级',
    comp: CourseGradeList,
    back: {
      path: '/system/course/list',
      breadcrumbs: ['学科列表', '打分等级'],
    },
  },
  {
    path: '/system/course/:courseId/:name/grade/edit',
    menuPath: '/system/course/list',
    apiPath: '/config/course/grade',
    title: '打分等级',
    comp: CourseGrade,
    back: {
      path: '/system/course/:courseId/:name/grade/list',
      params: ['courseId', 'name'],
      breadcrumbs: ['学科列表', '打分等级', '新增打分等级'],
    },
  },
  {
    path: '/system/course/:courseId/:name/grade/edit/:id',
    menuPath: '/system/course/list',
    apiPath: '/config/course/grade',
    title: '打分等级',
    comp: CourseGrade,
    back: {
      path: '/system/course/:courseId/:name/grade/list',
      params: ['courseId', 'name'],
      breadcrumbs: ['学科列表', '打分等级', '编辑打分等级'],
    },
  },
  {
    path: '/system/course/:courseId/:name/level/list',
    menuPath: '/system/course/list',
    apiPath: '/config/course/level',
    title: '考试等级',
    comp: CourseLevelList,
    back: {
      path: '/system/course/list',
      breadcrumbs: ['学科列表', '考试等级'],
    },
  },
  {
    path: '/system/course/:courseId/:name/level/edit',
    menuPath: '/system/course/list',
    apiPath: '/config/course/level',
    title: '考试等级',
    comp: CourseLevel,
    back: {
      path: '/system/course/:courseId/:name/level/list',
      params: ['courseId', 'name'],
      breadcrumbs: ['学科列表', '考试等级', '新增考试等级'],
    },
  },
  {
    path: '/system/course/:courseId/:name/level/edit/:id',
    menuPath: '/system/course/list',
    apiPath: '/config/course/level',
    title: '考试等级',
    comp: CourseLevel,
    back: {
      path: '/system/course/:courseId/:name/level/list',
      params: ['courseId', 'name'],
      breadcrumbs: ['学科列表', '考试等级', '编辑考试等级'],
    },
  },
  { path: '/login', comp: Login },
]

const Router = () => (
  <Switch>
    {routes.map((route) => {
      const { path, comp } = route
      return <Route key={path} path={path} exact component={comp} />
    })}
    <Redirect
      to={{
        pathname: '/agent/list',
      }}
    />
  </Switch>
)

export default Router

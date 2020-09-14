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
      breadcrumbs: ['学科列表', '新增学科'],
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

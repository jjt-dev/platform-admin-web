import React from 'react'
import { Redirect, Switch } from 'react-router'
import { Route } from 'react-router-dom'
import AgentList from './Custom/Agent/AgentList'
import Agent from './Custom/Agent/Agent'
import Login from './Login'
import AgentAdminList from './Custom/AgentAdmin/AgentAdminList'
import AgentAdmin from './Custom/AgentAdmin/AgentAdmin'

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
    title: '管理员',
    comp: AgentAdmin,
    back: {
      path: '/agent/:agentId/:agentName/admin/list',
      params: ['agentId', 'agentName'],
      breadcrumbs: ['代理商列表', '管理员列表', '编辑管理员'],
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

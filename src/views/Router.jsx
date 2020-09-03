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
    menuPath: '/agent/list',
    comp: AgentList,
  },
  {
    path: '/agent/edit',
    menuPath: '/agent/list',
    comp: Agent,
    back: {
      path: '/agent/list',
      breadcrumbs: ['代理列表', '新增代理'],
    },
  },
  {
    path: '/agent/edit/:id',
    menuPath: '/agent/list',
    comp: Agent,
    back: {
      path: '/agent/list',
      breadcrumbs: ['代理列表', '编辑代理'],
    },
  },
  {
    path: '/agent/user',
    menuPath: '/agent/user',
    comp: AgentAdminList,
  },
  {
    path: '/agent/user/edit',
    menuPath: '/agent/user',
    comp: AgentAdmin,
    back: {
      path: '/agent/user',
      breadcrumbs: ['代理管理员', '新增管理员'],
    },
  },
  {
    path: '/agent/user/edit/:id',
    menuPath: '/agent/user',
    comp: AgentAdmin,
    back: {
      path: '/agent/user',
      breadcrumbs: ['代理管理员', '编辑管理员'],
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

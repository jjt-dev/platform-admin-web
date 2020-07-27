import React from 'react'
import { Switch, Redirect } from 'react-router'
import { Route } from 'react-router-dom'
import School from './Custom/School/School'
import SchoolList from './Custom/School/SchoolList'
import SchoolAdmin from './Custom/SchoolAdmin/SchoolAdmin'
import SchoolAdminList from './Custom/SchoolAdmin/SchoolAdminList'
import Login from './Login'
import Welcome from './Welcome'

export const routes = [
  {
    path: '/school/list',
    menuPath: '/school/list',
    comp: SchoolList,
  },
  {
    path: '/school/edit',
    menuPath: '/school/list',
    comp: School,
    back: {
      path: '/school/list',
      breadcrumbs: ['学校列表', '新增学校'],
    },
  },
  {
    path: '/school/edit/:id',
    menuPath: '/school/list',
    comp: School,
    back: {
      path: '/school/list',
      breadcrumbs: ['学校列表', '编辑学校'],
    },
  },
  {
    path: '/school/user',
    menuPath: '/school/user',
    comp: SchoolAdminList,
  },
  {
    path: '/school/user/edit',
    menuPath: '/school/user',
    comp: SchoolAdmin,
    back: {
      path: '/school/user',
      breadcrumbs: ['学校管理员', '新增管理员'],
    },
  },
  {
    path: '/school/user/edit/:id',
    menuPath: '/school/user',
    comp: SchoolAdmin,
    back: {
      path: '/school/user',
      breadcrumbs: ['学校管理员', '编辑管理员'],
    },
  },
  { path: '/', comp: Welcome },
  { path: '/login', comp: Login },
]

const Router = () => (
  <Switch>
    {routes.map((route) => {
      const { path, comp } = route
      return <Route key={path} path={path} exact component={comp} />
    })}
    <Route component={Welcome} />
    <Redirect
      to={{
        pathname: '/login',
      }}
    />
  </Switch>
)

export default Router

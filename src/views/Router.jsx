import React from 'react'
import { Switch, Redirect } from 'react-router'
import { Route } from 'react-router-dom'
import School from './Custom/School/School'
import SchoolList from './Custom/School/SchoolList'
import Login from './Login'
import Welcome from './Welcome'

export const routes = [
  { path: '/', comp: Welcome },
  { path: '/login', comp: Login },
  {
    path: '/school/list',
    comp: SchoolList,
  },
  {
    path: '/school',
    comp: School,
    back: { path: '/school/list', breadcrumbs: ['学校列表', '新增学校'] },
  },
  {
    path: '/school/:id',
    comp: School,
    back: { path: '/school/list', breadcrumbs: ['学校列表', '编辑学校'] },
  },
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

import React from 'react'
import { Switch, Redirect } from 'react-router'
import { Route } from 'react-router-dom'
import Login from './Login'
import Welcome from './Welcome'

export const routes = [
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

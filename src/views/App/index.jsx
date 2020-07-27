import React, { useEffect, useMemo } from 'react'
import { Spin } from 'antd'
import Header from 'src/views/App/Header'
import { useSelector, useDispatch } from 'react-redux'
import * as appAction from 'src/actions/app'
import Router, { routes } from '../Router'
import './index.less'
import { matchPath, useHistory, useLocation } from 'react-router'
import ErrorBoundary from 'src/components/ErrorBoundary'
import SideMenu from './SideMenu'
import classnames from 'classnames'
import JjtBreadcrumb from 'src/views/App/JjtBreadcrumb'

const App = () => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const { loading, user } = useSelector((state) => state.app)
  const isLoginPage = useMemo(() => location.pathname.startsWith('/login'), [
    location,
  ])

  const activeRoute = useMemo(() => {
    return routes.find(
      (route) =>
        !!matchPath(location.pathname, { path: route.path, exact: true })
    )
  }, [location])

  useEffect(() => {
    if (!isLoginPage) {
      dispatch(appAction.getUserInfo())
    }
  }, [dispatch, isLoginPage])

  useEffect(() => {
    if (user) {
      dispatch(appAction.getAllCourses())
      dispatch(appAction.getAllReferees())
    }
  }, [dispatch, user])

  return (
    <div className={classnames('app', { 'login-page': isLoginPage })}>
      <Header user={user} />
      <main>
        <SideMenu
          history={history}
          location={location}
          navs={user?.navs}
          activeRoute={activeRoute}
        />
        <ErrorBoundary>
          <JjtBreadcrumb activeRoute={activeRoute} history={history} />
          {isLoginPage || user ? <Router /> : <div></div>}
        </ErrorBoundary>
      </main>
      {loading && <Spin />}
    </div>
  )
}

export default App

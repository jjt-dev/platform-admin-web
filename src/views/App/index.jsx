import './index.less'

import { Spin } from 'antd'
import classnames from 'classnames'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as appAction from 'src/actions/app'
import ErrorBoundary from 'src/components/ErrorBoundary'
import useActiveRoute from 'src/hooks/useActiveRoute'
import useLogin from 'src/hooks/useLogin'
import Header from 'src/views/App/Header'
import JjtBreadcrumb from 'src/views/App/JjtBreadcrumb'

import Router from '../Router'
import SideMenu from './SideMenu'

const App = () => {
  const activeRoute = useActiveRoute()
  const isLogin = useLogin()
  const dispatch = useDispatch()
  const { loading, user } = useSelector((state) => state.app)

  useEffect(() => {
    if (!isLogin) {
      dispatch(appAction.getUserInfo())
    }
  }, [dispatch, isLogin])

  useEffect(() => {
    if (user) {
      dispatch(appAction.getAgentLevels())
    }
  }, [dispatch, user])

  return (
    <div
      className={classnames('app', {
        'login-page': isLogin,
        'breadcrumb-active': activeRoute.back,
      })}
    >
      {/* <Header user={user} /> */}
      <main>
        <SideMenu navs={user?.navs} activeRoute={activeRoute} />
        <ErrorBoundary>
          <JjtBreadcrumb />
          {isLogin || user ? <Router /> : <div></div>}
        </ErrorBoundary>
      </main>
      {loading && <Spin />}
    </div>
  )
}

export default App

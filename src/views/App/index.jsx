import React, { useEffect, useMemo } from 'react'
import { Spin } from 'antd'
import Header from 'src/views/App/Header'
import { useSelector, useDispatch } from 'react-redux'
import * as appAction from 'src/actions/app'
import Router from '../Router'
import './index.less'
import { useHistory, useLocation } from 'react-router'
import ErrorBoundary from 'src/components/ErrorBoundary'
import SideMenu from './SideMenu'
import classnames from 'classnames'

const App = () => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const { loading, user } = useSelector((state) => state.app)
  const isLoginPage = useMemo(() => location.pathname.startsWith('/login'), [
    location,
  ])

  useEffect(() => {
    if (!isLoginPage) {
      dispatch(appAction.getUserInfo())
    }
  }, [dispatch, isLoginPage])

  return (
    <div className={classnames('app', { 'login-page': isLoginPage })}>
      {/* <Header user={user} /> */}
      <main>
        <SideMenu history={history} location={location} navs={user?.navs} />
        <ErrorBoundary>
          {isLoginPage || user ? <Router /> : <div></div>}
        </ErrorBoundary>
      </main>
      {loading && <Spin />}
    </div>
  )
}

export default App

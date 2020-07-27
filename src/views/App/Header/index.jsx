import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Dropdown } from 'antd'
import { goToLogin } from 'src/utils/api'
import logo from 'src/images/logo.png'
import './index.less'
import { local, TOKEN } from 'src/utils/storage'
import { UserOutlined } from '@ant-design/icons'

const Header = ({ user }) => {
  const signout = () => {
    local.removeItem(TOKEN)
    goToLogin()
  }

  return (
    <div className="header">
      <div className="header-logo">
        <Link to="/">
          <img src={logo} alt={logo} />
        </Link>
      </div>
      <div className="header-right">
        <div className="header-right__welcome">晋级通-管理平台欢迎您！</div>
        <div className="header-right__user">
          <div className="header-right__user-signout">
            <Dropdown overlay={getLogoutDropdown(signout)}>
              <span>
                <UserOutlined />
                {user?.username}
              </span>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header

const getLogoutDropdown = (signout) => {
  return (
    <Menu>
      <Menu.Item onClick={signout}>安全退出</Menu.Item>
    </Menu>
  )
}

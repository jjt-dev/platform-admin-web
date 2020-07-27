import React, { useMemo, useState } from 'react'
import { matchPath } from 'react-router'
import { Menu } from 'antd'
import './index.less'
import {
  AccountBookOutlined,
  AppstoreOutlined,
  BookOutlined,
  ContactsOutlined,
} from '@ant-design/icons'
import { routes } from 'src/views/Router'

const { SubMenu } = Menu
const rootMenuPid = 1

const SideMenu = ({ history, location, navs = [] }) => {
  const [selectedKeys, setSelectedKeys] = useState([])
  const { pathname } = location

  const [rootNavKeys, menus] = useMemo(() => {
    const rootNavs = navs.filter((nav) => nav.pid === rootMenuPid)
    const rootNavKeys = rootNavs.map((item) => item.id)
    const menus = rootNavs.map((root) => {
      root.children = navs.filter((nav) => nav.pid === root.id)
      root.icon = menuIcons[root.link]
      return root
    })
    return [rootNavKeys, menus]
  }, [navs])

  const [defaultOpenKeys, defaultSelectedKeys] = useMemo(() => {
    let defaultSelectedKeys = []
    let defaultOpenKeys = []
    const activeSubMenuPath = getActiveSubMenuPath(pathname)
    menus.forEach((menu) => {
      menu.children.forEach((subMenu) => {
        if (activeSubMenuPath === subMenu.link) {
          defaultSelectedKeys = [`${subMenu.id}`]
          defaultOpenKeys = [`${menu.id}`]
        }
      })
    })
    return [defaultOpenKeys, defaultSelectedKeys]
  }, [menus, pathname])

  const onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find((key) => !selectedKeys.includes(key))
    if (rootNavKeys.includes(latestOpenKey)) {
      setSelectedKeys(latestOpenKey ? [latestOpenKey] : [])
    } else {
      setSelectedKeys(openKeys)
    }
  }

  if (navs.length === 0) return null

  return (
    <Menu
      className="side-menu"
      defaultSelectedKeys={defaultSelectedKeys}
      defaultOpenKeys={defaultOpenKeys}
      mode="inline"
      onOpenChange={onOpenChange}
      theme="dark"
    >
      {menus.map((item) => {
        return (
          <SubMenu
            key={item.id}
            title={<span>{item.title}</span>}
            icon={item.icon}
          >
            {item.children.map((child) => (
              <Menu.Item
                key={child.id}
                onClick={() => history.push(child.link)}
              >
                {child.title}
              </Menu.Item>
            ))}
          </SubMenu>
        )
      })}
    </Menu>
  )
}

export default SideMenu

const menuIcons = {
  '/system': <AppstoreOutlined />,
  '/subject': <BookOutlined />,
  '/school': <ContactsOutlined />,
  '/business': <AccountBookOutlined />,
}

const getActiveSubMenuPath = (pathname) => {
  const activeRoute = routes.find((route) => !!matchPath(pathname, route.path))
  return activeRoute.menuPath
}

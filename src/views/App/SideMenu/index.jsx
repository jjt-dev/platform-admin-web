import React, { useMemo, useState } from 'react'
import { Menu } from 'antd'
import './index.less'
import {
  AccountBookOutlined,
  AppstoreOutlined,
  BookOutlined,
  ContactsOutlined,
} from '@ant-design/icons'
import { useHistory } from 'react-router'

const { SubMenu } = Menu
const rootMenuPid = 1

const SideMenu = ({ activeRoute }) => {
  const history = useHistory()
  const [selectedKeys, setSelectedKeys] = useState([])
  const rootNavs = navs.filter((nav) => nav.pid === rootMenuPid)
  const rootNavKeys = rootNavs.map((item) => item.id)
  const menus = rootNavs.map((root) => {
    root.children = navs.filter((nav) => nav.pid === root.id)
    root.icon = menuIcons[root.link]
    return root
  })

  const [defaultOpenKeys, defaultSelectedKeys] = useMemo(() => {
    let defaultSelectedKeys = []
    let defaultOpenKeys = []
    menus.forEach((menu) => {
      menu.children.forEach((subMenu) => {
        if (activeRoute.menuPath === subMenu.link) {
          defaultSelectedKeys = [`${subMenu.id}`]
          defaultOpenKeys = [`${menu.id}`]
        }
      })
    })
    return [defaultOpenKeys, defaultSelectedKeys]
  }, [menus, activeRoute])

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
  '/agent': <ContactsOutlined />,
  '/business': <AccountBookOutlined />,
}

const navs = [
  {
    link: '/agent',
    pid: 1,
    id: 4,
    title: '客户管理',
  },
  {
    link: '/agent/list',
    pid: 4,
    id: 7,
    title: '代理商',
  },
  {
    link: '/system',
    pid: 1,
    id: 2,
    title: '基础模块',
  },
  {
    link: '/system/agent-level',
    pid: 2,
    id: 5,
    title: '代理等级',
  },
]

import React, { useMemo, useState } from 'react'
import { Menu } from 'antd'
import './index.less'

const { SubMenu } = Menu
const rootMenuPid = 1

const SideMenu = ({ history, navs = [] }) => {
  const [selectedKeys, setSelectedKeys] = useState([])

  const [rootNavKeys, menus] = useMemo(() => {
    const rootNavs = navs.filter((nav) => nav.pid === rootMenuPid)
    const rootNavKeys = rootNavs.map((item) => item.id)
    const menus = rootNavs.map((root) => {
      root.children = navs.filter((nav) => nav.pid === root.id)
      return root
    })
    return [rootNavKeys, menus]
  }, [navs])

  const onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find((key) => !selectedKeys.includes(key))
    if (rootNavKeys.includes(latestOpenKey)) {
      setSelectedKeys(latestOpenKey ? [latestOpenKey] : [])
    } else {
      setSelectedKeys(openKeys)
    }
  }

  return (
    <Menu
      className="side-menu"
      openKeys={selectedKeys}
      mode="inline"
      onOpenChange={onOpenChange}
      theme="dark"
    >
      {menus.map((item) => {
        return (
          <SubMenu key={item.id} title={<span>{item.title}</span>}>
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

import React from 'react'
import './index.less'
import { Form, Input, Button } from 'antd'
import api from 'src/utils/api'
import { local, TOKEN } from 'src/utils/storage'
import * as appAction from 'src/actions/app'
import { useDispatch } from 'react-redux'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

const Login = ({ history }) => {
  const dispatch = useDispatch()

  const onFinish = async (values) => {
    const { username, password } = values
    try {
      const result = await api.post(
        `/common/login?username=${username}&password=${password}`
      )
      local.setItem(TOKEN, result)
      dispatch(appAction.getUserInfo())
      history.push('/')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="login">
      <div className="login-container">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            className="login-container-title"
            label="晋级通管理平台"
          ></Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            label="用户名"
            name="username"
          >
            <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} label="密码" name="password">
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="请输入密码"
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login

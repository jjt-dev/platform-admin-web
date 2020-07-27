import React from 'react'
import './index.less'
import loginLogo from 'src/images/login_logo.png'
import { Form, Input, Button, Divider } from 'antd'
import api from 'src/utils/api'
import { local, TOKEN } from 'src/utils/storage'
import * as appAction from 'src/actions/app'
import { useDispatch } from 'react-redux'
import { FormLayout } from 'src/utils/const'
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

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="login">
      <div className="login-container">
        <img src={loginLogo} alt="图片" />
        <div className="login-container__content">
          <Form
            {...FormLayout}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className="login-form"
          >
            <Form.Item>
              <Divider type="vertical" />
              <span className="login-title">晋级通平台管理</span>
            </Form.Item>
            <Form.Item
              rules={[{ required: true }]}
              label="用户名"
              name="username"
            >
              <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item
              rules={[{ required: true }]}
              label="密码"
              name="password"
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="请输入密码"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login

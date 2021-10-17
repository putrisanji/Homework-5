import React, { useState, useCallback } from "react"
import { Modal, Form, Input, Button, Select, Col } from "antd"
import {
  UserOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons"
import { useHistory } from "react-router-dom"

import "./login.css"
import BRI from "../../assets/image/BRI2.png"
import { useAuthorizedContext } from "../../AuthorizedContext"
import useLogin from "../../Mutations/useLogin"

const { Option } = Select

const Login = () => {
  const history = useHistory()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [data, setData] = useState({})
  const [selectedUserLevel, setSelectedUserLevel] = useState("customer")
  const { setAuthorizedValue } = useAuthorizedContext()
  const [visible, setVisible] = React.useState(false)
  const [confirmLoading, setConfirmLoading] = React.useState(false)

  const handleSuccessLogin = useCallback(() => {
    setAuthorizedValue(true, selectedUserLevel)
    history.push("/home")
  }, [setAuthorizedValue, history, selectedUserLevel])

  const { mutate: login } = useLogin(
    { email: username, password, selectedUserLevel },
    handleSuccessLogin,
    (error) => console.log("error >>", error)
  )

  const onFinish = (values) => {
    console.log("Received values of form: ", values)
  }

  const handleSelectedUserLevel = useCallback((value) => {
    setSelectedUserLevel(`${value}`)
  }, [])

  const UserType = [
    {
      key: "1",
      value: "customer",
      label: "Customer",
    },
    {
      key: "2",
      value: "agent",
      label: "Agent",
    },
  ]

  const handleChange = useCallback(
    (e) => {
      const name = e.target.name
      const value = e.target.value
      switch (name) {
        case "username":
          setUsername(value)
          setData({ ...data, [name]: value })
          break
        case "password":
          setPassword(value)
          setData({ ...data, [name]: value })
          break
        default:
      }
    },
    [data]
  )

  console.log("Ini data", data)
  console.log("INI ROLE", selectedUserLevel)

  const showModal = () => {
    setVisible(true)
  }

  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setVisible(false)
      setConfirmLoading(false)
    }, 1000)
  }

  const handleCancel = () => {
    console.log("Clicked cancel button")
    setVisible(false)
  }

  const handleRegisterAgen = useCallback(() => {
    history.push("/RegisterAgen");
  }, []);

  const handleRegisterCustomer = useCallback(() => {
    history.push("/RegisterCustomer");
  }, []);

  return (
    <div className="outer-login">
      <div className="inner-login">
        <div className="logo" style={{ marginTop: "-50px", width: "200px" }}>
          <img src={BRI} alt="logo" />
        </div>
        <Form
          labelCol={{ span: 6 }}
          labelAlign="left"
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          style={{ marginTop: "-30px" }}
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              name="username"
              value={username}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 6 }}
            labelAlign="left"
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleChange}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 6 }}
            name="login_as"
            label="Login As"
            rules={[
              {
                required: true,
                message: "Please choose user type!",
              },
            ]}
          >
            <Select
              defaultValue={selectedUserLevel}
              name="login_as"
              onChange={handleSelectedUserLevel}
            >
              {UserType.map((option) => (
                <Option key={option.key} value={option.value} label={option.label}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Col
              span={12}
              offset={2}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button className="btn-login" onClick={login}>
                Login
              </Button>

              <Button className="btn-register" onClick={showModal}>
                Register
              </Button>
            </Col>
          </Form.Item>
        </Form>
        <Modal
          className="my-modal-window"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="Agen" type="primary" onClick={handleRegisterAgen}>
              Agen
            </Button>,
            <Button key="Customer" type="primary" onClick={handleRegisterCustomer}>
              Customer
            </Button>,
          ]}
        >
          <p>Register sebagai</p>
        </Modal>
      </div>
    </div>
  )
}

export default Login

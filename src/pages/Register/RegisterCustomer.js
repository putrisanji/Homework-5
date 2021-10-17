import React, {useCallback} from "react"
import { Form, Input, Button, Col, Typography } from "antd"
import { useHistory } from "react-router-dom"

import { useAuthorizedContext } from "../../AuthorizedContext"
import "./Register.css"

const { Title } = Typography

const RegisterCustomer = () => {
  const history = useHistory()
  const { setAuthorizedValue } = useAuthorizedContext()

  const handleRegisterCustomerBtn = useCallback(() => {
    setAuthorizedValue(true)
    history.push("/home")
  }, [setAuthorizedValue, history])

  return ( 
    <div className="outer-login">
      <div className="inner-login">
        <div className="logo" style={{ marginTop: '0', marginBottom: "45px" }}>
          <Title style={{ textAlign: "center" }}>Sign Up</Title>
        </div>
        <Form
          layout="vertical"
          name="normal_Register"
          className="login-Register"
          initialValues={{
            remember: true,
          }}
          style={{ marginTop: "-30px" }}
        >
          <Form.Item
            name="nama"
            label="Nama"
            rules={[
              {
                required: true,
                message: "Kolom nama tidak boleh kosong!",
              },
            ]}
          >
            <Input placeholder="Masukkan Nama" name="nama" />
          </Form.Item>
          <Form.Item
            name="nomor-handphone"
            label="Nomor Handphone"
            rules={[
              {
                required: true,
                message: "Kolom Nomor Handphone tidak boleh kosong!",
              },
            ]}
          >
            <Input placeholder="Masukkan Nama" name="nomor-handphone" />
          </Form.Item>
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
            <Input placeholder="Username" name="username" />
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
            <Input type="password" placeholder="Password" name="password" />
          </Form.Item>
          <Form.Item
            name="konfirmasi-password"
            label="Konfirmasi Password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input type="password" placeholder="Ulangi Password" name="password" />
          </Form.Item>
          <Form.Item>
            <Col
              span={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button className="btn-registerAgenCustomer" onClick={handleRegisterCustomerBtn}>Register Customer</Button>
            </Col>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default RegisterCustomer

import React from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { API_URL, TOKEN } from "../const/Api";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
const LoginP = () => {
    const onFinish = (values) => {
        axios.post(API_URL + '/sign-in',values).then(res => {
            localStorage.setItem(TOKEN,res.data.data.token)
            window.location.href = '/'
        }).catch(err => {
            message.error("email or password",err)
           
        })
      };
  return (
    <div className="container-fluid background_login">
         <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="wrapper_login">
        <div className="title_login">
          <span>
            Admin login 
          </span>
        </div>
      <Form
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
      >
     

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" className="input"  prefix={<LockOutlined className="site-form-item-icon" />}/>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
      </div>
    </div>
    </div>
  )
}

export default LoginP
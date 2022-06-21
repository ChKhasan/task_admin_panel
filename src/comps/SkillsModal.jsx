import React from 'react'
import { Modal, Button, Form, Input} from "antd";
import { PercentageOutlined, UserOutlined } from '@ant-design/icons';
const SkillsModal = ({isModalVisible,handleCancel,handleOk,form,onFinish}) => {
  return (
    <div>   <Modal
    title="Basic Modal"
    visible={isModalVisible}
    // onOk={handleOk}
    onCancel={handleCancel}
    footer={[]}
  >
    <Form
      name="normal_login"
      form={form}
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        rules={[
          { required: true, message: "Please input your Username!" },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Name"
        />
      </Form.Item>
      <Form.Item
        name="percent"
        rules={[
          { required: true, message: "Please input your Password!" },
        ]}
      >
        <Input
          prefix={
            <PercentageOutlined className="site-form-item-icon" />
          }
          placeholder="Percent"
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          Add
        </Button>
      </Form.Item>
    </Form>
  </Modal></div>
  )
}

export default SkillsModal
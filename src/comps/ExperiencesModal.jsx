import React from 'react'
import { Modal, Button, Form, Input} from "antd";

const ExperiencesModal = ({isModalVisible,handleCancel,handleOk,form,onFinish}) => {
  return (
    <div>
         <Modal
            title="Basic Modal"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[]}
          >
            <Form
              name="normal_login"
              form={form}
              layout="vertical"
              // className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="work_name"
                label="Work Name"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="company_name"
                label="Company Name"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="description"
                label="Description"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="start_date"
                label="Start Date"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="end_date"
                label="End Date"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input />
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
          </Modal>
    </div>
  )
}

export default ExperiencesModal

import {
  Table,
  Modal,
  Button,
  Form,
  Input,
  Skeleton,
  Select,
  Space,
} from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import { EditTwoTone } from "@ant-design/icons";
import { getData, postData, putData } from "../server/common";
import { EMPLOYEE_CREATE, EMPLOYEE_UPDATE } from "../const/Api";
import useGetData from '../hooks/useGetData';

const { Option } = Select;

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
};
const Employee = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [roleData, setRoleData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form] = Form.useForm();
  const [selectRole, setSelectRole] = useState(false);
  const [employeeData,loading,getEmployeeData] = useGetData("/paging?page=1&limit=5")
  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (_, a) => <>{a.role ? a.role.name : ""}</>,
    },
    {
      title: "Action",
      key: "action",
      render: (record, _) => (
        <Space size="middle">
          <a onClick={() => editApiData(record)}>
            <EditTwoTone />
          </a>
        </Space>
      ),
    },
  ];


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    if (editId) {
      putData(EMPLOYEE_UPDATE, { ...values, _id: editId, roleId: selectRole }).then(
        () => {
          getEmployeeData();
        }
      );
      setEditId(null);
    } else {
      postData(EMPLOYEE_CREATE, { ...values, roleId: selectRole }).then((res) => {
        console.log(res);
        getEmployeeData();
      });
    }
    setIsModalVisible(false);
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setSelectRole(value);
  };

  useEffect(() => {
    getEmployeeData();
    getData("/role?limit=5&page=1").then((resp) => {
      setRoleData(resp.data.data.data);
    });
  }, []);
  const editApiData = (e) => {
    form.setFieldsValue(e);
    setIsModalVisible(true);
    setEditId(e._id);
  };
  return (
    <div>
      <div className="content-body">
        <div className="content-title">
          <h3>Employee</h3>
        </div>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <div className="d-flex w-100 justify-content-end">
            <Button type="primary" onClick={showModal}>
              Add Employee
            </Button>
            <Modal
              title="Employee"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[]}
            >
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                form={form}
              >
                <Form.Item
                  name="fullName"
                  label="Full Name"
                  rules={[
                    { required: true, message: "Please input your fullName!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    { required: true, message: "Please input your Password!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item>
                  <Select
                    style={{ width: 240 }}
                    allowClear
                    onChange={handleChange}
                  >
                    {roleData.map((item, element) => {
                      return (
                        <Option value={item._id} key={element}>
                          {item.name}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Create
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </div>
          {loading ? (
            <Skeleton active text="200" />
          ) : (
            <Table
              rowKey={"_id"}
              className="mt-4"
              rowSelection={{
                type: "chekbox",
                ...rowSelection,
              }}
              columns={columns}
              dataSource={employeeData}
            />
          )}
        </Content>
      </div>
    </div>
  );
};

export default Employee;

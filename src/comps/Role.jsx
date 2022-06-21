import { Modal, Button, Form, Input, Skeleton, Switch, Checkbox } from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { deleteData, postData, putData } from "../server/common";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ROLE, ROLE_CATEGORY } from "../const/Api";
import useGetData from "../hooks/useGetData";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Role = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [select, setSelect] = useState(null);
  const [editId, setEditId] = useState(null);
  const [form] = Form.useForm();
  const [value, setValue] = useState(0);
  const [roleData, loading,getRoleData] = useGetData("/role?limit=5&page=1");

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
      putData(ROLE, { ...values, _id: editId }).then(() => {
        getRoleData();
      });
      setEditId(null);
    } else {
      postData(ROLE, { ...values }).then((res) => {
        console.log(res);
        getRoleData();
      });
    }
    form.resetFields();

    setIsModalVisible(false);
    setIsModalVisible(false);
  };
  useEffect(() => {
    getRoleData();
  }, []);
  const deleteRole = () => {
    deleteData(`${ROLE}/${select}`);
    getRoleData();
  };
  const editRole = () => {
    setEditId(select);
    setIsModalVisible(true);

    getRoleData();
  };
  
  return (
    <div>
      <div className="content-body">
        <div className="content-title">
          <h3>Role</h3>
        </div>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <div className="d-flex w-100 justify-content-between">
            <div>
              <Button type="primary" danger onClick={() => deleteRole()}>
                Delete
              </Button>
              <Button
                type="primary"
                className="mx-4"
                onClick={() => editRole()}
              >
                Edit
              </Button>
            </div>

            <Button type="primary" onClick={showModal}>
              Add Skill
            </Button>

            <Modal
              title="Role"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[]}
            >
              <Form
                form={form}
                name="normal_login"
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
                    placeholder="name"
                  />
                </Form.Item>
                <Form.Item
                  name="description"
                  rules={[
                    { required: true, message: "Please input your Username!" },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="description"
                  />
                </Form.Item>
                {ROLE_CATEGORY.map((element, index) => {
                  return (
                    <Form.Item
                      key={index}
                      name={element.name}
                      label={element.label}
                      valuePropName="checked"
                      rules={[{ required: true, message: "YES / NO!" }]}
                    >
                      <Switch checkedChildren="Yes" unCheckedChildren="No" />
                    </Form.Item>
                  );
                })}
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
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  {roleData.map((item, index) => {
                    return (
                      <Tab
                        label={item.name}
                        {...a11yProps(index)}
                        onClick={() => setSelect(item._id)}
                      />
                    );
                  })}
                </Tabs>
              </Box>
              {roleData.map((item, index) => {
                return (
                  <TabPanel value={value} index={index}>
                    <Typography variant="h4" display="block" gutterBottom>
                      {item.name}
                    </Typography>
                    <Typography variant="button" display="block" gutterBottom>
                      {item.description}
                    </Typography>
                    <div className="row">
                      <div className="col-3">
                        <Typography>
                          Employee{" "}
                          <Checkbox
                            checked={item.employee}
                            onChange={onChange}
                          ></Checkbox>
                        </Typography>
                        <Typography>
                          employeeCreate{" "}
                          <Checkbox
                            checked={item.employeeCreate}
                            onChange={onChange}
                          ></Checkbox>
                        </Typography>
                        <Typography>
                          employeeUpdate{" "}
                          <Checkbox
                            checked={item.employeeUpdate}
                            onChange={onChange}
                          ></Checkbox>
                        </Typography>
                        <Typography>
                          employeeDelete{" "}
                          <Checkbox
                            checked={item.employeeDelete}
                            onChange={onChange}
                          ></Checkbox>
                        </Typography>
                      </div>
                      <div className="col-3">
                        <Typography>
                          role{" "}
                          <Checkbox
                            checked={item.role}
                            onChange={onChange}
                          ></Checkbox>
                        </Typography>
                        <Typography>
                          roleCreate{" "}
                          <Checkbox
                            checked={item.roleCreate}
                            onChange={onChange}
                          ></Checkbox>
                        </Typography>
                        <Typography>
                          roleDelete{" "}
                          <Checkbox
                            checked={item.roleDelete}
                            onChange={onChange}
                          ></Checkbox>
                        </Typography>
                        <Typography>
                          roleUpdate{" "}
                          <Checkbox
                            checked={item.roleUpdate}
                            onChange={onChange}
                          ></Checkbox>
                        </Typography>
                      </div>
                      <div className="col-3">
                        <Typography>
                          book{" "}
                          <Checkbox
                            checked={item.book}
                            onChange={onChange}
                          ></Checkbox>
                        </Typography>
                        <Typography>
                          bookCreate{" "}
                          <Checkbox
                            checked={item.bookCreate}
                            onChange={onChange}
                          ></Checkbox>
                        </Typography>
                        <Typography>
                          bookDelete{" "}
                          <Checkbox
                            checked={item.bookDelete}
                            onChange={onChange}
                          ></Checkbox>
                        </Typography>
                        <Typography>
                          bookUpdate{" "}
                          <Checkbox
                            checked={item.bookUpdate}
                            onChange={onChange}
                          ></Checkbox>
                        </Typography>
                      </div>
                      <div className="col-3">
                        <Typography>
                          author{" "}
                          <Checkbox
                            checked={item.author}
                            onChange={onChange}
                          ></Checkbox>
                        </Typography>
                        <Typography>
                          authorCreate{" "}
                          <Checkbox
                            checked={item.authorCreate}
                            onChange={onChange}
                          ></Checkbox>
                        </Typography>
                        <Typography>
                          authorDelete{" "}
                          <Checkbox
                            checked={item.authorDelete}
                            onChange={onChange}
                          ></Checkbox>
                        </Typography>
                        <Typography>
                          authorUpdate{" "}
                          <Checkbox
                            checked={item.authorUpdate}
                            onChange={onChange}
                          ></Checkbox>
                        </Typography>
                      </div>
                      <div className="col-3">
                        <Typography>
                          genre{" "}
                          <Checkbox
                            checked={item.genre}
                            onChange={onChange}
                          ></Checkbox>
                        </Typography>
                        <Typography>
                          genreCreate{" "}
                          <Checkbox
                            checked={item.genreCreate}
                            onChange={onChange}
                          ></Checkbox>
                        </Typography>
                        <Typography>
                          genreDelete{" "}
                          <Checkbox
                            checked={item.genreDelete}
                            onChange={onChange}
                          ></Checkbox>
                        </Typography>
                        <Typography>
                          genreUpdate{" "}
                          <Checkbox
                            checked={item.genreUpdate}
                            onChange={onChange}
                          ></Checkbox>
                        </Typography>
                      </div>
                      <div className="col-3">
                        <Typography>
                          user{" "}
                          <Checkbox
                            checked={item.user}
                            onChange={onChange}
                          ></Checkbox>
                        </Typography>
                        <Typography>
                          userCreate{" "}
                          <Checkbox
                            checked={item.userCreate}
                            onChange={onChange}
                          ></Checkbox>
                        </Typography>
                        <Typography>
                          userDelete{" "}
                          <Checkbox
                            checked={item.userDelete}
                            onChange={onChange}
                          ></Checkbox>
                        </Typography>
                        <Typography>
                          userUpdate{" "}
                          <Checkbox
                            checked={item.userUpdate}
                            onChange={onChange}
                          ></Checkbox>
                        </Typography>
                      </div>
                      <div className="col-3">
                        <Typography>
                          course{" "}
                          <Checkbox
                            checked={item.course}
                            onChange={onChange}
                          ></Checkbox>
                        </Typography>
                        <Typography>
                          courseCreate{" "}
                          <Checkbox
                            checked={item.courseCreate}
                            onChange={onChange}
                          ></Checkbox>
                        </Typography>
                        <Typography>
                          courseDelete{" "}
                          <Checkbox
                            checked={item.courseDelete}
                            onChange={onChange}
                          ></Checkbox>
                        </Typography>
                        <Typography>
                          courseUpdate{" "}
                          <Checkbox
                            checked={item.courseUpdate}
                            onChange={onChange}
                          ></Checkbox>
                        </Typography>
                        <Typography>
                          isDeleted{" "}
                          <Checkbox
                            checked={item.isDeleted}
                            onChange={onChange}
                          ></Checkbox>
                        </Typography>
                      </div>
                    </div>
                  </TabPanel>
                );
              })}
            </Box>
          )}
        </Content>
      </div>
    </div>
  );
};

export default Role;

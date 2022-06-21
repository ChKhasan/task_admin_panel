import { Table } from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import PasswordIcon from "@mui/icons-material/Password";
import { Form, Input, InputNumber, Button, Upload } from "antd";
import { EditTwoTone } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import { Image } from "antd";
import { getData,postData, putData } from "../server/common";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
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

const PersonalSettings = () => {
  const [edit, setEdit] = useState(true);
  const [value, setValue] = useState(0);
  const [adminData, setAdminData] = useState([]);

  const onFinish = (values) => {
    console.log(values);

    putData("auth/updatedetails",value).then((res) => {
      getResponse()
    })

    setEdit(true);
  };
const getResponse = () => {
  getData("/auth/me").then((res) => {
    setAdminData(res.data.data);
    console.log(res.data.data);
  });
}
  useEffect(() => {
    getResponse()
  }, []);
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "./Images/IMG_20211115_234554.jpg",
    },
  ]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
const onFinishPassword = (values) => {
   console.log(values)
   putData("auth/updatepassword",values).then((res) => {
    console.log(res);
}).catch((err) => {
console.log(err);
})
}
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };
  return (
    <div className="content-body">
      <div className="content-title">
        <h3>Personal</h3>
      </div>
      <Content
        className="site-layout-background"
        style={{
          margin: "24px 16px",
          padding: 24,
          minHeight: 280,
        }}
      >
        <Box sx={{ bgcolor: "background.paper", width: 500 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              icon={<PersonPinIcon />}
              iconPosition="start"
              label="Profile"
              {...a11yProps(1)}
            />
            <Tab
              icon={<PasswordIcon />}
              iconPosition="start"
              label="Password"
              {...a11yProps(0)}
            />
          </Tabs>
        </Box>
        <TabPanel label="NEARBY" value={value} index={0}>
          {edit ? (
            <div className="row flex-wrap">
              <div className="col-12 d-flex justify-content-center ">
                <div
                  className="personal_info inline-block "
                  style={{ display: "inline-block" }}
                >
                  <Image width={200} src="./Images/IMG_20211115_234554.jpg" />
                </div>
              </div>
              <div className="d-flex justify-content-center mt-3 mb-3">
                <Button onClick={() => setEdit(false)}>
                  <EditTwoTone />
                  Изменить
                </Button>
              </div>
              <div className=" col-6">
                <div className="personal_info">
                  <p>First Name</p>
                  <span>{adminData.first_name}</span>
                </div>
              </div>
              <div className=" col-6">
                <div className="personal_info">
                  <p>Last Name</p>
                  <span>{adminData.last_name}</span>
                </div>
              </div>
              <div className=" col-6">
                <div className="personal_info">
                  <p>Username</p>
                  <span>{adminData.username}</span>
                </div>
              </div>
              <div className=" col-6">
                <div className="personal_info">
                  <p>info</p>
                  <span>{adminData.info}</span>
                </div>
              </div>
              <div className=" col-6">
                <div className="personal_info">
                  <p>phoneNumber</p>
                  <span>{adminData.phoneNumber}</span>
                </div>
              </div>
              <div className=" col-6">
                <div className="personal_info">
                  <p>birthday</p>
                  <span>{adminData.birthday}</span>
                </div>
              </div>
              <div className=" col-6">
                <div className="personal_info">
                  <p>address</p>
                  <span>{adminData.address}</span>
                </div>
              </div>
              <div className=" col-6">
                <div className="personal_info">
                  <p>email</p>
                  <span>{adminData.email}</span>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <ImgCrop rotate>
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                >
                  {fileList.length < 5 && "+ Upload"}
                </Upload>
              </ImgCrop>
              <Form
                {...layout}
                layout="vertical"
                name="nest-messages"
                onFinish={onFinish}
                validateMessages={validateMessages}
              >
                <Form.Item
                  name="first_name"
                  label="First Name"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="last_name"
                  label="Last Name"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="username"
                  label="User Name"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      type: "email",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="phoneNumber"
                  label="Phone Number"
                  rules={[
                    {
                      type: "number",
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
                <Form.Item name="birthday" label="Birthday">
                  <Input />
                </Form.Item>
                <Form.Item name="address" label="Address">
                  <Input />
                </Form.Item>
                <Form.Item name="info" label="Info">
                  <Input.TextArea />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                  <Button type="primary" htmlType="submit">
                    Send
                  </Button>
                </Form.Item>
              </Form>
            </div>
          )}
        </TabPanel>
        <TabPanel label="NEARBY" value={value} index={1}>
          <div>
            <Form
              name="basic"
              layout="vertical"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinishPassword}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Current Password"
                name="currentPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="New Password"
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Change
                </Button>
              </Form.Item>
            </Form>
          </div>
        </TabPanel>
      </Content>
    </div>
  );
};

export default PersonalSettings;

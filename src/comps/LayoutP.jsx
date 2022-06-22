import React, { useState } from "react";
import { Dropdown, Layout, Menu, Switch, Table } from "antd";
import {
  VideoCameraOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import "../style/adminPanel.css";
import { Link } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { TOKEN } from "../const/Api";
const logOut = () => {
  localStorage.removeItem(TOKEN);
  window.location.href = "/";
};
const menu = (
  <Menu
    items={[
   
      {
        label: <Button onClick={logOut}>Log out</Button>,
      },
    ]}
  />
);
const LayoutP = ({ children }) => {
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div>
      <div className="background"></div>

      <Layout>
        <div
          style={{
            width: collapsed ? "80px" : "200px",
            transition: "color 0.3s",
          }}
        ></div>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            zIndex: 10,
            theme: "light",
          }}
        >
          <Menu
            theme="dark"
            mode="inline"
            style={{ background: "white", height: "100px" }}
            defaultSelectedKeys={["1"]}
            className="d-flex justify-content-center align-items-center flex-column"
          ></Menu>
          <Menu mode="inline" defaultSelectedKeys={["1"]}>
        
            <Menu.Item key="1" icon={<VideoCameraOutlined />}>
              <Link to="/employee">Employee</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              <Link to="/role">Role</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<VideoCameraOutlined />}>
              <Link to="/author">Author</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<VideoCameraOutlined />}>
              <Link to="/category">Category</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<VideoCameraOutlined />}>
              <Link to="/books">Books</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<VideoCameraOutlined />}>
              <Link to="/course">Course</Link>
            </Menu.Item>
       
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background " style={{ padding: 0 }}>
            <div className="d-flex layout-header justify-content-between align-items-center  ">
              <Button onClick={toggle}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </Button>

              <Dropdown className="werwerert" overlay={menu} placement="bottom">
                <Button>
                  {" "}
                  <Stack direction="row" spacing={2}>
                    <Avatar
                      alt="Remy Sharp"
                      src="./Images/IMG_20211115_234554.jpg"
                    />
                  </Stack>
                </Button>
              </Dropdown>
            </div>
          </Header>
          {children}
          {/* <Users  /> */}
        </Layout>
      </Layout>
    </div>
  );
};

export default LayoutP;

import { Table, Modal, Button, Form, Input, Upload, Skeleton,Switch,Select } from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import { UserOutlined, PercentageOutlined } from "@ant-design/icons";
import { getData, postData } from "../server/common";
import ImgCrop from "antd-img-crop";
import axios from "axios";
import { TOKEN } from "../const/Api";
const { Option } = Select;
const columns = [
  {
    title: "Full Name",
    dataIndex: "fullName",
  },
  {
    title: "Role",
    dataIndex: "role",
    render: (text) => <a>{text.name}</a>,
  },
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User",
    // Column configuration not to be checked
    name: record.name,
  }),
};
const Portfolios = () => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleRole, setIsModalVisibleRole] = useState(false);
  const [portfolioData, setPortfolioData] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [imageUrl, setImageUrl] = useState({});
  const [imageId, setImageId] = useState({});
  const [loading, setLoading] = useState(false);
  let formData = new FormData();

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    formData.append("file", newFileList[newFileList.length - 1].originFileObj);
    axios
      .post("https://portfolio-bakcend.herokuapp.com/api/v1/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
        },
      })
      .then((resp) => {
        setImageId(resp.data.data._id);
      });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };
  const showModalRole = () => {
    setIsModalVisibleRole(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOkRole = () => {
    setIsModalVisible(false);
  };

  const handleCancelRole = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    postData("create", { ...values, photo: imageId }).then((res) => {
      console.log(res.data.data.photo);
    });
    setIsModalVisible(false);
  };

  const onFinishRole = (values) => {
    console.log("Success:", values);
    setIsModalVisibleRole(false);
 
  };
  useEffect(() => {
    setLoading(true);
    getData("/paging?page=1&limit=5")
      .then((res) => {
        //   const data = res.data.data.map(element => {
        // axios
        //   .get(
        //     `https://portfolio-bakcend.herokuapp.com/uploads/${element.photo._id}.png`,
        //     { responseType: "blob" }
        //   )
        //   .then((response) => {
        // let imageNode = document.getElementById("image");
        // let imgUrl = URL.createObjectURL(response.data);
        // return imgUrl
        // imageNode.src = imgUrl;
        // setImageUrl(imgUrl);
        // });
        // })
        console.log(res.data.data.data);
        setPortfolioData(res.data.data.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const onChangeSwitch = (checked) => {
    console.log(`switch to ${checked}`);
  };
  return (
    <div>
      <div className="content-body">
        <div className="content-title">
          <h3>Portfolios</h3>
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
            <Button type="primary" danger>
              Delete
            </Button>

            <Button type="primary" onClick={showModal}>
              Add Skill
            </Button>
            <Modal
              title="Basic Modal"
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
              >
                <Form.Item
                  name="fullName"
                  rules={[
                    { required: true, message: "Please input your Username!" },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="fullName"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please input your Password!" },
                  ]}
                >
                  <Input
                    prefix={
                      <PercentageOutlined className="site-form-item-icon" />
                    }
                    placeholder="password"
                  />
                </Form.Item>

                {/* <ImgCrop rotate>
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    beforeUpload={() => false}
                    maxCount={1}
                    // onPreview={onPreview}
                  >
                    {fileList.length < 5 && "+ Upload"}
                  </Upload>
                </ImgCrop> */}
              <Select defaultValue="lucy" style={{ width: 120 }} allowClear>
      <Option value="lucy">Lucy</Option>
      <Option value="lucy">wewr</Option>
      <Option value="lucy">Lucewry</Option>
      <Option value="lucy">werew</Option>
      <Option value="lucy">Luwerewrcy</Option>
    </Select>
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
          {loading ? (
            <Skeleton active text="200" />
          ) : (
            <Table
              className="mt-4"
              rowSelection={{
                type: "chekbox",
                ...rowSelection,
              }}
              columns={columns}
              dataSource={portfolioData}
            />
          )}
        </Content>
      </div>
    </div>
  );
};

export default Portfolios;

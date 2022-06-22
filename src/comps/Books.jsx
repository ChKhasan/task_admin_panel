import {
  Table,
  Modal,
  Button,
  Form,
  Input,
  Upload,
  Skeleton,
  Select,
  Space,
} from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import { EditTwoTone } from "@ant-design/icons";
import { deleteData, getData, postData, putData } from "../server/common";
import { BOOK, IMG_SRC, TOKEN } from "../const/Api";
import axios from "axios";
import ImgCrop from "antd-img-crop";
import useUploadImg from "../hooks/useUploadImg";
import useGetData from '../hooks/useGetData';

const { Option } = Select;

const Books = () => {
  const [authorData, setAuthorData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form] = Form.useForm();
  const [selected, setSelected] = useState([]);
  const [imageId,fileList,onChange] = useUploadImg()
  const [bookData,loading,getCategoryData] = useGetData("/book?limit=5&page=1")
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Elektron",    
      dataIndex: "ebookUrl",
    },
    {
      title: "imgUrl",
      dataIndex: "imgUrl",
      render: (_, record) => (
        <Space size="middle">
          <img style={{ width: "50px" }} src={`${IMG_SRC}/${record.imgUrl}`} />
        </Space>
      ),
    },
    {
      title: "author",
      key: "author",
      dataIndex: "author",
      render: (_, aut) => <>{aut.author ? aut.author.fullName : ""}</>,
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>{record.name}</a>
          <a onClick={() => editApiData(record)}>
            <EditTwoTone />
          </a>
        </Space>
      ),
    },
  ];


  const rowSelection = {
    onChange: (_, selectedRows) => {
      setSelected(selectedRows);
    },
   
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    if (editId) {
      putData(BOOK, { ...values, _id: editId }).then(() => {
        getCategoryData();
      });
      setEditId(null);
    } else {
      console.log(values);
      postData(BOOK, { ...values, imgUrl: imageId }).then((res) => {
        getCategoryData();
      });
    }
    form.resetFields();

    setIsModalVisible(false);
  };


  useEffect(() => {
    getCategoryData();
    getData("/author?page=1&limit=5").then((res) => {
      setAuthorData(res.data.data.data);
    });
    getData("/category?limit=5&page=1").then((res) => {
      setCategoryData(res.data.data.data);
    });
  }, []);
  const editApiData = (e) => {
    form.setFieldsValue(e);
    setIsModalVisible(true);
    setEditId(e._id);
  };
  const deleteApiData = () => {
    selected.map((item) => deleteData(`${BOOK}/${item._id}`));
    getCategoryData();
    getCategoryData();

    setSelected([]);
  };

  return (
    <div>
      <div className="content-body">
        <div className="content-title">
          <h3>Books</h3>
        </div>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <div className=" ">
            <div className="row">
              <div className="col-6 d-flex justify-content-start">
                {selected.length > 0 && (
                  <Button type="primary" danger onClick={() => deleteApiData()}>
                    Delete
                  </Button>
                )}
              </div>
              <div className="col-6  d-flex justify-content-end">
                <Button type="primary" onClick={showModal}>
                  Add Books
                </Button>
              </div>
            </div>

            <Modal
              title="Books"
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
                  name="name"
                  label="Name"
                  rules={[
                    { required: true, message: "Please input your Username!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="description"
                  label="description"
                  rules={[
                    { required: true, message: "Please input your Username!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="ebookUrl"
                  label="ebookUrl"
                  rules={[
                    { required: true, message: "Please input your Username!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <ImgCrop rotate>
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
                </ImgCrop>

                <Form.Item name="authorId" label="Author">
                  <Select style={{ width: 240 }} allowClear>
                    {authorData.map((item, element) => {
                      return (
                        <Option value={item._id} key={element}>
                          {item.fullName}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item name="categoryId" label="Category">
                  <Select style={{ width: 240 }} allowClear>
                    {categoryData.map((item, element) => {
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
              dataSource={bookData}
            />
          )}
        </Content>
      </div>
    </div>
  );
};

export default Books;

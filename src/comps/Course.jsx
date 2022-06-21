import {
  Table,
  Modal,
  Button,
  Form,
  Input,
  Upload,
  Skeleton,
  Space,
} from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import { EditTwoTone } from "@ant-design/icons";
import { deleteData, postData, putData } from "../server/common";
import { COURSE, IMG_SRC } from "../const/Api";
import ImgCrop from "antd-img-crop";
import useGetData from "../hooks/useGetData";
import useUploadImg from "../hooks/useUploadImg";


const Course = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form] = Form.useForm();
  const [selected, setSelected] = useState([]);
  const [bookData,loading,getBookData] = useGetData("/course?limit=5&page=1")
  const [imageId,fileList,onChange] = useUploadImg()


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
      title: "imgUrl",
      dataIndex: "imgUrl",
      render: (_, record) => (
        <Space size="middle">
          {record.imgUrl.length > 50 ? <img style={{ width: "50px" }} src={`${record.imgUrl}`} />:<img style={{width: "50px"}} src={`${IMG_SRC}/${record.imgUrl}`} />}
          
        </Space>
      ),
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
      putData(COURSE, { ...values, _id: editId }).then(() => {
        getBookData();
      });
      setEditId(null);
    } else {
      console.log(values);
      postData(COURSE, { ...values, imgUrl: imageId }).then((res) => {
        getBookData();
      });
    }
    form.resetFields();

    setIsModalVisible(false);
  };

  useEffect(() => {
    getBookData();
  }, []);
  const editApiData = (e) => {
    form.setFieldsValue(e);
    setIsModalVisible(true);
    setEditId(e._id);
  };
  const deleteApiData = () => {
    selected.map((item) => deleteData(`${COURSE}/${item._id}`));
    getBookData();

    setSelected([]);
  };

  return (
    <div>
      <div className="content-body">
        <div className="content-title">
          <h3>Course</h3>
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
                  Add Course
                </Button>
              </div>
            </div>

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
                  label="Description"
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

export default Course;

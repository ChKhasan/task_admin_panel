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
import { deleteData, getData, postData, putData } from "../server/common";
import { AUTHOR, IMG_SRC } from "../const/Api";
import ImgCrop from "antd-img-crop";
import useUploadImg from "../hooks/useUploadImg";
import useGetData from "../hooks/useGetData";


const Author = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form] = Form.useForm();
  const [selected, setSelected] = useState([]);
  const [imageId,fileList,onChange] = useUploadImg()
  const [authorData,loading,getAuthorData] = useGetData("/author?page=1&limit=5")
  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
    },
    {
      title: "Book Count",
      dataIndex: "bookCount",
    },
    {
      title: "Img Url",
      dataIndex: "imgUrl",
      render: (_, record) => (
        <Space size="middle">
          {record.imgUrl.length > 50 ? (
            <img style={{ width: "50px" }} src={`${record.imgUrl}`} />
          ) : (
            <img
              style={{ width: "50px" }}
              src={`${IMG_SRC}/${record.imgUrl}`}
            />
          )}
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
    if (editId) {
      putData(AUTHOR, { ...values, _id: editId }).then(() => {
        getAuthorData();
      });
      setEditId(null);
    } else {
      postData(AUTHOR, { ...values, imgUrl: imageId }).then((res) => {
        console.log(res);
        getAuthorData();
      });
    }
    form.resetFields();

    setIsModalVisible(false);
  };




  useEffect(() => {
    getAuthorData();
  }, []);
  const editApiData = (e) => {
    form.setFieldsValue(e);
    setIsModalVisible(true);
    setEditId(e._id);
  };
  const deleteApiData = () => {
    selected.map((item) => deleteData(`${AUTHOR}/${item._id}`));
    getAuthorData();
    getAuthorData();
    setSelected([]);
  };

  return (
    <div>
      <div className="content-body">
        <div className="content-title">
          <h3>Author</h3>
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
                  Add Author
                </Button>
              </div>
            </div>

            <Modal
              title="Author"
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
                  label="fullName"
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
              dataSource={authorData}
            />
          )}
        </Content>
      </div>
    </div>
  );
};

export default Author;

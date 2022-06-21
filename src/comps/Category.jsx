import {
  Table,
  Modal,
  Button,
  Form,
  Input,
  Upload,
  Skeleton,
  Space,
  Tag,
} from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import { EditTwoTone } from "@ant-design/icons";
import { deleteData, getData, postData, putData } from "../server/common";
import { CATEGORY, IMG_SRC } from "../const/Api";
import ImgCrop from "antd-img-crop";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useUploadImg from "../hooks/useUploadImg";
import useGetData from "../hooks/useGetData";

const Category = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleBook, setIsModalVisibleBook] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form] = Form.useForm();
  const [selected, setSelected] = useState([]);
  const [showBookInfo, setShowBookInfo] = useState({});
  const [imageId,fileList,onChange] = useUploadImg()
  const [categoryData,loading,getCategoryData] = useGetData("/category?limit=5&page=1")
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
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
      title: "Books ( Click on the book for information )",
      key: "books",
      dataIndex: "books",
      render: (books, _) => (
        <>
          {books.map((tag) => {
            let color = tag.length > 3 ? "geekblue" : "green";

            if (tag === "loser") {
              color = "volcano";
            }

            return (
              <Tag
                color={color}
                key={tag}
                style={{ cursor: "pointer" }}
                onClick={() => showBooksInfo(tag.name, tag.imgUrl, tag.author)}
              >
                {tag.name}
              </Tag>
            );
          })}
        </>
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
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

  const handleOkBook = () => {
    setIsModalVisibleBook(false);
  };

  const handleCancelBook = () => {
    setIsModalVisibleBook(false);
  };
  const onFinish = (values) => {
    console.log("Success:", values);
    if (editId) {
      putData(CATEGORY, { ...values, _id: editId }).then(() => {
        getCategoryData();
      });
      setEditId(null);
    } else {
      console.log(values);
      postData(CATEGORY, { ...values, imgUrl: imageId }).then((res) => {
        getCategoryData();
      });
    }
    form.resetFields();

    setIsModalVisible(false);
  };


  useEffect(() => {
    getCategoryData();
  }, []);
  const editApiData = (e) => {
    form.setFieldsValue(e); 
    setIsModalVisible(true);
    setEditId(e._id);
  };
  const deleteApiData = () => {
    selected.map((item) => deleteData(`${CATEGORY}/${item._id}`));
    getCategoryData();

    setSelected([]);
  };
  const showBooksInfo = (name, imgUrl, author) => {
    setShowBookInfo({ name: name, imgUrl: imgUrl, author: author });
    setIsModalVisibleBook(true);
  };

  return (
    <div>
      <div className="content-body">
        <div className="content-title">
          <h3>Category</h3>
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
                  Add Category
                </Button>
              </div>
            </div>
            <Modal
              title="Basic Modal"
              visible={isModalVisibleBook}
              onOk={handleOkBook}
              onCancel={handleCancelBook}
              footer={[]}
            >
              <Card sx={{ maxWidth: 500 }}>

                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      <CardMedia
                        component="img"
                        height="194"
                        image={`${IMG_SRC}/${
                          showBookInfo.author && showBookInfo.author.imgUrl
                        }`}
                        alt="Paella dish"
                      />
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={showBookInfo.author && showBookInfo.author.fullName}
                  subheader="Author"
                />
                <CardMedia
                  component="img"
                  height="194"
                  image={`${IMG_SRC}/${showBookInfo.imgUrl}`}
                  alt="Paella dish"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {showBookInfo.name}
                  </Typography>
                </CardContent>
              </Card>
            </Modal>
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
              rowKey={"_id"}
              className="mt-4"
              rowSelection={{
                type: "chekbox",
                ...rowSelection,
              }}
              columns={columns}
              dataSource={categoryData}
            />
          )}
        </Content>
      </div>
    </div>
  );
};

export default Category;

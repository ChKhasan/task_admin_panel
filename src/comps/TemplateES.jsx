import { Table, Button, Form, Space, Skeleton } from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import { getData, postData, deleteData, putData } from "../server/common";
import { EditTwoTone } from "@ant-design/icons";
import ExperiencesModal from "./ExperiencesModal";
import SkillsModal from "./SkillsModal";

const Experiences = ({ types, columns_obj }) => {
  
  const columns = [
    ...columns_obj,
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>{record._id}</a>
          {console.log(record)}
          <a onClick={() => editApiData(record)}>
            <EditTwoTone />
          </a>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelected(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selected, setSelected] = useState([]);
  const [skillData, setSkillData] = useState([]);
  const [isEdit, setIsEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getApiData = () => {
    setLoading(true);
    getData(types)
      .then((res) => setSkillData(res.data.data))
      .finally(() => {
        setLoading(false);
      });
  };
  const onFinish = (values) => {
    console.log("Success:", values);

    if (isEdit) {
      console.log("put", isEdit);
      putData(`${types}/${isEdit._id}`, values).then(() => {
        getApiData();
      });
      setIsEdit(null);
    } else {
      console.log("post", isEdit);

      postData(types, values).then(() => {
        getApiData();
      });
    }
    form.resetFields();

    setIsModalVisible(false);
  };
  const deleteApiData = () => {
    selected.map((item) => deleteData(`${types}/${item._id}`));
    getApiData();
    setSelected([]);
  };

  useEffect(() => {
    getApiData();
  }, [types]);

  const editApiData = (e) => {
    form.setFieldsValue(e);
    setIsEdit(e);
    setIsModalVisible(true);
  };
  return (
    <div className="content-body">
      <div className="content-title">
        <h3>Experiences</h3>
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
          <div className="col-6 d-flex justify-content-start">
            {selected.length > 0 && (
              <Button type="primary" danger onClick={deleteApiData}>
                Delete
              </Button>
            )}
          </div>
          <div className="col-6 d-flex justify-content-end">
            <Button type="primary" onClick={showModal}>
              Add {types}
            </Button>
          </div>
          {types === "experiences" ? (
            <ExperiencesModal
              form={form}
              isModalVisible={isModalVisible}
              handleOk={handleOk}
              handleCancel={handleCancel}
              onFinish={onFinish}
            />
          ) : (
            <SkillsModal
              form={form}
              isModalVisible={isModalVisible}
              handleCancel={handleCancel}
              onFinish={onFinish}
            />
          )}
        </div>
        {loading ? (
          <Skeleton active />
        ) : (
          <Table
            className="mt-4"
            rowKey="_id"
            rowSelection={{
              type: "chekbox",
              ...rowSelection,
            }}
            columns={columns}
            dataSource={skillData}
          />
        )}
      </Content>
    </div>
  );
};

export default Experiences;

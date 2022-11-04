import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Table,
  Popconfirm,
  Space,
  Modal,
  Button,
  Form,
  Input,
  InputNumber,
} from "antd";

const data = [
  {
    id: 1,
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    id: 2,
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    id: 3,
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
];
var products = [
  {
    id: 1,
    slug: "iphone-x",
    name: "Iphone X",
    price: 30000000,
  },
  {
    id: 2,
    slug: "samsung-galaxy-s7",
    name: "SamSung Galaxy S7",
    price: 13000000,
  },
  {
    id: 3,
    slug: "oppo-f1s",
    name: "Oppo F1s",
    price: 10000000,
  },
];
const Products = () => {
  const [formModal] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [dataArr, setDataArr] = useState(data);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <NavLink to={`/products/${text}`}>{text}</NavLink>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <button onClick={() => openModal(record.id)}>Edit</button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.id)}
          >
            <button>Delete</button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const openModal = (id) => {
    const dataModal = dataArr.find((item) => item.id === id);
    console.log(dataModal);
    formModal.setFieldsValue({
      id: dataModal.id,
      age: dataModal.age,
      name: dataModal.name,
      address: dataModal.address,
    });
    setVisible(true);
  };

  const handleDelete = (id) => {
    setDataArr(dataArr.filter((item) => item.id !== id));
  };

  const createPeople = () => {
    formModal.resetFields();
    formModal.setFieldsValue({
      id: dataArr.length + 1,
    });
    setVisible(true);
  };

  const onFinish = (values) => {
    const index = dataArr.findIndex((item) => item.id === values.id);
    console.log(index);
    if (index > -1) {
      const peopleEdit = dataArr
        .filter((x) => x.id === values.id)
        .map((item) => (item = values));
      const newArr = dataArr.map(
        (obj) => peopleEdit.find((o) => o.id === obj.id) || obj
      );
      setDataArr(newArr);
    } else {
      console.log(values);
      console.log([...dataArr, values]);
      setDataArr([...dataArr, values]);
    }

    handleCancel();
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const result = products.map((product, index) => {
    return (
      <NavLink key={index} to={`/products/${product.slug}`}>
        <li className="list-group-item">
          {product.id} - {product.name} - {product.price}
        </li>
      </NavLink>
    );
  });
  return (
    <div className="container">
      <h1>Day la danh sach san pham</h1>

      <div className="row">
        <ul className="list-group">{result !== "" ? result : ""}</ul>
      </div>
      <div className="row">
        <Button
          type="primary"
          onClick={createPeople}
          danger
          style={{ marginLeft: "auto" }}
        >
          Create
        </Button>
      </div>
      <div className="row">
        <Table columns={columns} dataSource={dataArr} />
      </div>
      <Modal
        title="Edit Student"
        visible={visible}
        onCancel={handleCancel}
        footer={
          <Button type="primary" htmlType="submit" form="formModal">
            Save
          </Button>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          form={formModal}
          name="formModal"
          onFinish={onFinish}
        >
          <Form.Item name="id" label="id" rules={[{ required: true }]}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="age" label="Age" rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Products;

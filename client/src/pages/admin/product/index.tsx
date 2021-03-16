import React, { useState } from "react";
import {
  Form,
  Button,
  Input,
  Table,
  Popconfirm,
  Image,
  notification,
} from "antd";
import UploadFile from "../../../components/uploadFile";
import ModalCreateProduct from "./modal";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import apis from "../../../api";
import ModalAntd from "../../../components/Modal";
import { SUCCESS } from "../../../constants";

const ManageProduct = () => {
  const [form] = Form.useForm();
  const [url, setUrl] = useState("");
  const [visible, setVisible] = useState(false);
  const [visibles, setVisibles] = useState(false);
  const [edit, setEdit] = useState(false);
  const [product, setProduct]: any = useState([]);
  const [dataEdit, setDataEdit] = useState({});
  const handleSubmit = (e: any) => {
    setVisible(false);
    apis.createProduct(e).then((resp: any) => {
      debugger;
      if (resp?.data.status === SUCCESS) {
        setProduct([...product, e]);
      }
    });
    form.resetFields()
  };
  React.useEffect(() => {
    apis.getProduct().then((resp) => setProduct(resp.data.data));
  }, []);
  const columns = [
    {
      key: 2,
      title: "Name product",
      dataIndex: "title",
    },
    {
      key: 3,
      title: "Description",
      dataIndex: "description",
    },
    {
      key: 4,
      title: "Price",
      dataIndex: "price",
    },
    {
      key: 5,
      title: "image",
      dataIndex: "image",
      render: (text: string, record: any, index: number) => (
        <Image width={40} src={record.image} />
      ),
    },
    {
      key: 6,
      title: "",
      render: (text: string, record: any, index: number) => (
        <div>
          <Popconfirm
            onConfirm={() => DeleteProduct(record?._id)}
            placement="leftTop"
            title="Bạn chắc chắn muốn xóa nhân viên này ?"
            okText="Yes"
            cancelText="No"
          >
            <Button className="btn-delete" shape="circle">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
          <Button
            className="ml-2"
            onClick={() => onOpenEdit(record)}
            shape="circle"
          >
            <EditOutlined />
          </Button>
        </div>
      ),
    },
  ];
  const DeleteProduct = (e: any) => {
    apis.deleteProduct({ id: e }).then((resp: any) => {
      if (resp.data.status === SUCCESS) {
        notification.success({ message: "Delete success" });
        const dataNew = product?.filter((el: any) => el._id !== e);
        console.log(dataNew);
        setProduct(dataNew);
      }
    });
  };

  const onOpenEdit = (e: any) => {
    setEdit(true);
    setVisible(true);
    setDataEdit(e);
  };

  const handleEdit = (e: any) => {
      setVisible(false)
       apis.updateProduct({id: e.id, data: e?.e}).then((resp: any)=> {
           if(resp?.data.status === SUCCESS){
               notification.success({message: 'Edit success'});
               const dataNew = product.map((el: any) => {
                 if(el?._id === e.id){
                     const elNew = e?.e;
                   return {...elNew,_id: el._id} 
                 }
                 return el;
               })
               setProduct(dataNew);
           }
       });
       form.resetFields()
  };
 
  const handleSearchChange = (e: any) => {
      apis.searchProduct(e.target.value)
  }
  return (
    <>
      <div className="d-flex justify-content-between">
        <Form style={{ width: "40%", display: "flex" }}>
          <Form.Item style={{ width: "80%" }}>
            <Input onChange={handleSearchChange}/>
          </Form.Item>
        </Form>
        <Button type="primary" onClick={() => setVisible(true)}>
          + Create Product
        </Button>
        <ModalCreateProduct
          handleEdit={handleEdit}
          setEdit={setEdit}
          dataEdit={dataEdit}
          edit={edit}
          visible={visible}
          setVisible={setVisible}
          form={form}
          handleSubmit={handleSubmit}
        />
      </div>
      <div className="product-content">
        <Table columns={columns} dataSource={product} size="middle" />
      </div>
    </>
  );
};

export default ManageProduct;

import React, { useState } from "react";
import { Button, Form, Input, notification, Popconfirm, Radio, Spin, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import apis from "../../../api";
import { Irespone } from "../../../constants/interface";
import FormatMoney from "../../../components/format-money";
import socketIOClient from "socket.io-client";
import "./style.scss";
import { useHistory } from "react-router";
import LoadingPage from "../../../components/LoadingPage";
import { ERROR, SUCCESS } from "../../../constants";
import ModalAntd from "../../../components/Modal";
import ButtonCustom from "../../../components/Button";
const ENDPOINT = "http://localhost:3002";
const OrderForm = () => {
  const [order, setOrder]: any = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [status,setStatus] = useState('');
  const [loadingButton,setLoadingButton] = useState(false);
  const [record, setRecord]: any = useState("");
  const history = useHistory();
  const [formEdit] = Form.useForm();
  const socket = socketIOClient(ENDPOINT, {
    reconnectionDelay: 100,
    reconnection: true,
    reconnectionAttempts: 5000,
    transports: ["websocket", "polling", "flashsocket"],
    agent: false, // [2] Please don't set this to true
    upgrade: false,
    rejectUnauthorized: false,
  });
  const columns = [
    {
      key: "1",
      title: "STT",
      render: (text: string, record: any, index: number) => (
        <span key={`key--${index}`}>{index + 1}</span>
      ),
    },
    {
      key: "2",
      title: "Mã đơn hàng",
      render: (text: string, record: any, index: number) => (
        <span className={history.location.state === record._id ? "active" : ""}>
          OD-{record._id}
        </span>
      ),
    },
    {
      key: "3",
      title: "Người nhận",
      render: (text: string, record: any, index: number) => (
        <span>{record.infor.name}</span>
      ),
    },
    {
      key: "4",
      title: "Số điện thoại",
      render: (text: string, record: any, index: number) => (
        <span>{record.infor.phone}</span>
      ),
    },
    {
      key: "5",
      title: "Trạng thái đơn hàng",
      render: (text: string, record: any, index: number) => (
        <span
          className={
            record.status === 0
              ? "status-default"
              : record.status === 1
              ? "status-ship"
              : "status-complete"
          }
        >
          {record.status === 0
            ? "Chờ lấy hàng"
            : record.status === 1
            ? "Đang giao"
            : "Hoàn thành"}
        </span>
      ),
    },
    {
      key: "6",
      title: "Tổng số tiền",
      render: (text: string, record: any, index: number) => (
        <span>
          <FormatMoney money={record.product.sum_price} />
        </span>
      ),
    },

    {
      key: "7",
      title: "",
      render: (text: string, record: any, index: number) => (
        <div key={`key--${index}`}>
          <Popconfirm
            onConfirm={() => DeleteProduct(record?._id)}
            placement="leftTop"
            title="Bạn chắc chắn muốn xóa đơn hàng này ?"
            okText="Yes"
            cancelText="No"
          >
            <Button
              disabled={record.rule === 2}
              className="btn-delete"
              shape="circle"
            >
              <DeleteOutlined />
            </Button>
          </Popconfirm>
          <Button
            className="ml-2"
            // disabled={record.rule === 2}
            onClick={() => {
              handleOpenEdit(record);
            }}
            shape="circle"
          >
            <EditOutlined />
          </Button>
        </div>
      ),
    },
  ];

  React.useEffect(() => {
    socket.on("getAllOrder", (data: any) => {
      if (data) {
        setOrder(data.reverse());
        setLoading(false);
      }
    });
    socket.on("countAccess", data =>{
      console.log(data)
    })
  }, []);

  const DeleteProduct = (id: string) => {
    apis.deleteOrder(id).then(({ data }: { data: Irespone }) => {
      if (data.status === SUCCESS) {
        const newOrder = order.filter((el: any) => el._id !== id);
        setOrder(newOrder);
      }
    });
  };
  const handleOpenEdit = (record: any) => {
    setVisible(true);
    setRecord(record);
    formEdit.setFieldsValue({
        name: record.infor.name,
        phone: record.infor.phone,
        status: record.status,
        sum_price: record.product.sum_price
    })
  };

  const handleEdit = (e: any) => {
      setLoadingButton(true);
    apis.editOrder({...record, status: e.status, infor: {...record.infor,name: e.name, phone: e.phone}, product: {...record.product, sum_price: e.sum_price}}).then(({data}: {data: Irespone})=>{
        if(data.status === SUCCESS){
            setVisible(false);
            const newOrder = order.map((el: any) => {
                if(el._id === record._id){
                    return {...el, status: e.status, infor: {...record.infor,name: e.name, phone: e.phone}, product: {...record.product, sum_price: e.sum_price}}
                }
                return el;
            })
            setOrder(newOrder);
            setLoadingButton(false);
        }
        else if(data.status === ERROR){
            notification.error({message: 'Edit Error'});
            setLoadingButton(false);
        }
    })
  };

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <>
      <Table
        className="admin_table-order"
        columns={columns}
        dataSource={order}
      />
      {visible ? (
        <ModalAntd visible={visible} onCancle={() => setVisible(false)}>
          <Form form={formEdit} onFinish={handleEdit}>
            <Form.Item name="name" label="Nguời nhận">
              <Input />
            </Form.Item>
            <Form.Item name="phone" label="Số điện thoại">
              <Input />
            </Form.Item>
            <Form.Item name="status" label="Trạng thái đơn hàng">
              <Radio.Group onChange={(e)=> setStatus(e.target.value)} value={status}>
                <Radio value={0}>Chờ lấy hàng</Radio>
                <Radio value={1}>Đang giao</Radio>
                <Radio value={2}>Hoàn thành</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="sum_price" label="Tổng số tiền">
              <Input />
            </Form.Item>
            <Form.Item>
                <ButtonCustom htmlType="submit" mode="dark">{loadingButton && <Spin className="pr-3"/>}Hoàn thành</ButtonCustom>
            </Form.Item>
          </Form>
        </ModalAntd>
      ) : null}
    </>
  );
};

export default OrderForm;
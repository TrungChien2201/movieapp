import  React, {useState} from 'react';
import apis from '../../../api';
import {Table, Image, Popconfirm, Button, notification} from 'antd';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { SUCCESS } from '../../../constants';
import { Irespone } from '../../../constants/interface'
import ModalEditAccount from './modalEdit';
import LoadingPage from '../../../components/LoadingPage';
const MangerAccount = () => {
    const [account, setAccount] = useState([]);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    const [data, setData] = useState();
    
    const columns = [
        {
          key: "stt",
          title: "STT",
          render: (text: string, record: any, index: number) => (
            <span key={`key--${index}`}>{index+1}</span>
          ),
        },
        {
          key: "username",
          title: "Tài khoản",
          dataIndex: "username",
        },
        {
          key: "password",
          title: "Mật khẩu",
          dataIndex: "password",
        },
        {
            key: "rule",
            title: "Loại tài khoản",
            dataIndex: "rule",
            render: (text: string, record: any, index: number) => (
                <span key={`key--${index}`}>{record.rule === 1? "Thường": "Admin"}</span>
              ),
        },
        {
          key: "action",
          title: "",
          render: (text: string, record: any, index: number) => (
            <div key={`key--${index}`}>
              <Popconfirm
                onConfirm={() => DeleteProduct(record?._id)}
                placement="leftTop"
                title="Bạn chắc chắn muốn xóa tài khoản này ?"
                okText="Yes"
                cancelText="No"
                
              >
                <Button disabled={record.rule === 2} className="btn-delete" shape="circle">
                  <DeleteOutlined />
                </Button>
              </Popconfirm>
              <Button
                className="ml-2"
                // disabled={record.rule === 2}
                onClick={() => {setVisible(true);setData(record)}}
                shape="circle"
              >
                <EditOutlined />
              </Button>
            </div>
          ),
        },
      ];


 React.useEffect(()=> {
     apis.getAccount().then(({data}: {data: Irespone})=>{
        if(data.status === SUCCESS){
           setAccount(data.data);
           setLoading(false)
        }
     })
 },[])

 const DeleteProduct = (id: string) => {
    apis.deleteAccount(id).then(({data}: {data: Irespone}) => {
        if(data.status === SUCCESS){
            const newArray = account.filter((item: any) => item._id !== id)
            setAccount(newArray)
        }
    })
 }

 const EditAccount = (e: any) => {
   apis.editAccount(e).then(({data}: {data: Irespone})=> {
       if(data.status === SUCCESS){
           const newArray: any =  account?.map((el: any)=> {
               if(el._id === e.id){
                  return {...el, username: e.username, password: e.password, rule: e.rule}
               }
               else return el;
           })
           setAccount(newArray);
           notification.success({message: 'Edit account success'});
           setVisible(false)
       }
   })
 }

 if(loading){
   return <LoadingPage />
 }
  return(
      <div>
           <Table style={{width: "100%", marginTop: 100}} columns={columns} dataSource={account} />
           {visible ? <ModalEditAccount  data={data} visible={visible} setVisible={setVisible} EditAccount={EditAccount}/> : null}
      </div>
  )
}
export default MangerAccount;
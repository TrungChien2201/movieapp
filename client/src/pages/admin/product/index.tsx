import  React,{useState} from 'react';
import {Form, Button, Input} from 'antd';
import UploadFile from '../../../components/uploadFile';
import ModalCreateProduct from './modal';
import apis from '../../../api';


const ManageProduct = () => {
    const [form] = Form.useForm();
    const [url,setUrl] = useState('');
    const [visible,setVisible] = useState(false);
    const handleSubmit =(e:any) => {
        console.log(e)
       apis.createProduct(e).then(resp => console.log(resp))
    }
   return (
       <>
       <div className="d-flex justify-content-between">
           <Form style={{width: '40%',display: 'flex'}}>
               <Form.Item style={{width: '80%'}}>
                   <Input />
               </Form.Item>
               <Form.Item>
                   <Button type="primary">Search</Button>
               </Form.Item>
           </Form>
           <Button type="primary" onClick={()=>setVisible(true)}>+Create Product</Button>
           <ModalCreateProduct visible={visible} setVisible={setVisible} form={form}  handleSubmit={handleSubmit}/>
       </div>
       <div className="product-content">
          
       </div>
       </>
   )
}

export  default ManageProduct;
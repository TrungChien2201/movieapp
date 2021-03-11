import React, { useState } from 'react';
import {Form , Button , Input} from 'antd';
import apis from '../../../api';
import UploadFile from '../../../components/uploadFile';
const ForgotPassword = () => {
    const [user,setUser] = useState({username: ''});
    const handleOnchange = (e:any) => {
        setUser({username: e.target.value})
    }
    const handleSubmit = async(e:any) => {
        
       await apis.forgotPassword(user).then(resp => {
           console.log(resp)
       })
    }
    return (
      <>
        <Form onFinish={handleSubmit}>
        <Form.Item label="Email address">
         
          <Input onChange={handleOnchange} placeholder="Enter email" />
        </Form.Item>
        
        <Button type="primary" htmlType="submit">
          Forgot
        </Button>
      </Form>   
      <UploadFile />
      </>
    )
}

export default ForgotPassword
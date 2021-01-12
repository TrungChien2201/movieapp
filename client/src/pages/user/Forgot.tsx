import React, { useState } from 'react';
import {Form,Button} from 'react-bootstrap';
import apis from '../../api';
const ForgotPassword = () => {
    const [user,setUser] = useState({username: ''});
    const handleOnchange = (e:any) => {
        setUser({username: e.target.value})
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
       await apis.forgotPassword(user).then(resp => {
           console.log(resp)
       })
    }
    return (
        <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onChange={handleOnchange} placeholder="Enter email" />
        </Form.Group>
        
        <Button variant="primary" type="submit">
          Forgot
        </Button>
      </Form>   
    )
}

export default ForgotPassword
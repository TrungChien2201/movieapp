import React, { useState } from "react";
import api from "../api";
import { Button , Form} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
const Login = () => {
    const [data,setData] = useState({
        username: '',
        password: ''
    })
    const history = useHistory()
    const handleOnchange = (key) => (e) => {
        setData({...data,[key]: e.target.value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.login(data).then(res => {
           if(res.data.status === 'Success'){
               localStorage.setItem('Auth', res.data.accessToken);
           }
            
        })
    }
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter email" onChange={handleOnchange('username')} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={handleOnchange('password')} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Login;

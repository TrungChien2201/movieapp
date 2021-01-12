import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import api from '../../api';
const Register = () => {
  const [value,setValue] = useState({
    username: '',
    password: '',
  })

  const handleOnchange = (key:any) => (e) => {
    setValue({...value,[key]: e.target.value});
  }
  const handleRegister = async(e:any) => {
    e.preventDefault();
    await api.register(value).then(resp => {
      console.log(resp)
    })
   console.log(value)
  }
   return (
     <Form onSubmit={handleRegister}>
       <Form.Group controlId="formBasicEmail">
         <Form.Label>Email address</Form.Label>
         <Form.Control onChange={handleOnchange('username')}  placeholder="Enter email" />
       </Form.Group>
       <Form.Group controlId="formBasicPassword">
         <Form.Label>Password</Form.Label>
         <Form.Control onChange={handleOnchange('password')} type="password" placeholder="Password" />
       </Form.Group>
       <Form.Group controlId="formBasicCheckbox">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" />
       </Form.Group>
       <Button variant="primary" type="submit">
          Register
       </Button>
     </Form>
   )
}

export default Register;
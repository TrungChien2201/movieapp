import React, { useEffect, useState } from "react";
import api from "../../../api";
import { Button, Form, Input , Checkbox} from "antd";
import { Link, useHistory } from "react-router-dom";
import "./styles.scss";

const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [form] = Form.useForm();
  const [checked,setChecked] = useState(false);
  const [login,setLogin] = useState(true);
  const history = useHistory();
  const handleOnchange = (key: any) => (e: any) => {
    setData({ ...data, [key]: e.target.value });
  };
  const handleSubmit = async (e: any) => {
    if(!login){
      await api.register({username: e.username,password: e.password}).then((resp:any) => {
        debugger
        if (resp.data.status === 'Success') {
          localStorage.setItem("auth", resp.data.accessToken);
          localStorage.setItem("id", resp.data._id);

          history.push("/");
        }
      })
    }
    else {
      await api.login(data).then((res) => {
      if (res.data.status === "Success") {
        console.log(res, 'res')
        localStorage.setItem("auth", res.data.accessToken);
        localStorage.setItem("id", res.data.userId);

        history.push("/");
      }
    })}
    }
    
  
  const rememberChange = (e:any) => {
     setChecked(e.target.checked)
  }
  const Auth = localStorage.getItem("Auth");
  useEffect(() => {
    if (Auth) {
      history.replace("/");
    }
  }, [Auth]);
  return (
    <div className="content-page">
      <div className="container m-auto">
      <div className="content-containers col-md-12 col-lg-10">
        <div className="login">
          <h3 className="login-title">{login ? 'Sign In' : 'Sign Up'}</h3>
          <Form form={form} onFinish={handleSubmit}>
            <Form.Item
              name="username"
              label="Username"
              colon = {false} 
              className="input-username"
              rules={[{ required: true, message: "Enter username" }]}
            >
              <Input
                type="text"
                placeholder="Enter email"
                onChange={handleOnchange("username")}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              colon = {false} 
              className="input-password"
              rules={[{ required: true, message: "Enter password" }]}
            >
              <Input
                type="password"
                placeholder="Password"
                onChange={handleOnchange("password")}
              />
            </Form.Item>
            {!login ? <Form.Item
              name="confirm-password"
              label="Confirm Password"
              colon = {false} 
              className="input-password"
              rules={[
                { required: true, message: "Enter password" },
                { whitespace: true, message: "Enter password" },
                ({ getFieldValue }: { getFieldValue: any }) => ({
                  validator(rule: any, value: any) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        'Password is fail'
                      ),
                    );
                  },
                }),
              ]}
            >
              <Input
                type="password"
                placeholder="Confirm Password"
                onChange={handleOnchange("confirm-password")}
              />
            </Form.Item>:null}
            <Button className="login-btn-submit" htmlType="submit" type="primary">
              Submit
            </Button>
          </Form>
          {login?
          <div className="d-flex justify-content-between mt-3 login-action">
            <Checkbox
            checked={checked}
            onChange={rememberChange}
          >
            <span className="remember">Remember</span>
          </Checkbox>
          <Link to="/forgot" className="forgot-password">ForgotPassword</Link>
          </div>:null}
        </div>
        <div className="sign-up">
          <div className="sign-up-content">
            <h3 className="sign-up-title">Welcome to {login ? 'login' : 'sign up'}</h3>
             <p className="mb-0">{login ? "Don't have an account?" : "Create new account"}</p>
            {login ? <Button onClick={()=>{setLogin(false);form.resetFields()}} className="login-btn-submit border-white">Sign Up</Button> : <Button onClick={()=>{form.resetFields();setLogin(true)}} className="border-white login-btn-submit">Sign In</Button>}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Login;

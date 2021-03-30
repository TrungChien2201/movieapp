import  React,{useState} from 'react';
import MenuAdmin from './menu';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ManageProduct from '../../pages/admin/product';
import './style.scss';
import {Badge} from 'antd';
import Dashboard from '../../pages/admin/dashboard';
import MangerAccount from '../../pages/admin/account';
import socketIOClient from "socket.io-client";
import Notify from './notify';
const ENDPOINT  = "http://localhost:3002";
const LayoutAdmin = () => {
    const [collapse,setCollapse] = useState(false);
    const [showNoti,setShowNoti] = useState(false);
    const [data,setData] = useState('');
    const numberNoti: any = localStorage.getItem('count')
    const countNoti = JSON.parse(numberNoti);
    const [count, setCount]: any = useState(countNoti ? countNoti : 0);
    const rule = localStorage.getItem("rule");
    React.useEffect(()=> {
        if(rule !== '2'){
           window.location.href = "/"
        }
    },[])
    
    const socket = socketIOClient(ENDPOINT,{
        reconnectionDelay: 100,
        reconnection:true,
        reconnectionAttempts: 5000,
        transports: ['websocket', 'polling', 'flashsocket'],
        agent: false, // [2] Please don't set this to true
        upgrade: false,
        rejectUnauthorized: false
    });
    React.useEffect(() => {
        
        socket.on("Order", data => {
            console.log(data);
                setCount(data.length);
                setData(data)
        
        });
        // socket.disconnect()
        
    },[count,socket])
    
    const handleShowNotify = () => {
        setShowNoti(!showNoti) 
    }
    const handlePreview = (id: string) => {
       socket.emit("Preview", id)
    }
    return (
        <div className="container-fluid layout-page">
            <div className="row justify-content-between">
                <div className="col-3 col-xl-2 col-lg-3 col-md-3 col-sm-3 pl-0 menu-admin
                ">
                    <MenuAdmin collapse={collapse} setCollapse={setCollapse} />
                </div>
                <div id="layout-content" className={`col-9 col-xl-12 col-lg-12 col-md-12 col-sm-9 layout-content ${collapse && 'layout-collapse'}`}>
                    <div className="layout-header d-flex justify-content-between">
                        <div>Logo</div>
                        <div style={{paddingTop: '10px',paddingRight: '10px'}}>
                        
                        <div onClick={handleShowNotify} style={{display: 'block'}}>
                            <Badge count={count !== 0 ? count : null}>
                           <i onBlur={()=>setShowNoti(false)} style={{fontSize: '24px', color: '#675b5b'}} className="fas fa-bell"></i> 
                        </Badge>
                            </div>
                          {showNoti && <Notify data={data} handlePreview={handlePreview}/>}
                        </div>
                    </div>
                    <div style={{marginTop: 70}}>

                    </div>
                    <Switch>
                        <Router>
                            <Route path="/admin/create-product" component={ManageProduct} />
                            <Route path="/admin/manager-account" component={MangerAccount} />
                            <Route path="/admin" exact component={Dashboard} />
                        </Router>
                    </Switch>
                </div>
            </div>
        </div>
    )
}
export default LayoutAdmin;
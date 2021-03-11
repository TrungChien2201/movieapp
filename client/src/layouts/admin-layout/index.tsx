import  React,{useState} from 'react';
import MenuAdmin from './menu';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ManageProduct from '../../pages/admin/product';
import './style.scss'
import Dashboard from '../../pages/admin/dashboard';

const LayoutAdmin = () => {
    const [collapse,setCollapse] = useState(false);

    
    return (
        <div className="container-fluid layout-page">
            <div className="row justify-content-between">
                <div className="col-3 col-xl-2 col-lg-3 col-md-3 col-sm-3 pl-0 menu-admin
                ">
                    <MenuAdmin collapse={collapse} setCollapse={setCollapse} />
                </div>
                <div id="layout-content" className={`col-9 col-xl-10 col-lg-9 col-md-9 col-sm-9 layout-content ${collapse && 'layout-collapse'}`}>
                    <div className="layout-header">
                        <h3>Logo</h3>
                    </div>
                    <div style={{marginTop: 70}}>

                    </div>
                    <Switch>
                        <Router>
                            <Route path="/admin/create-product" component={ManageProduct} />
                            <Route path="/admin" exact component={Dashboard} />
                        </Router>
                    </Switch>
                </div>
            </div>
        </div>
    )
}
export default LayoutAdmin;
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import Authorzited from '../../Authozited';
import { Login, MoviesInsert, MoviesList, MoviesUpdate } from '../../pages';
import ForgotPassword from '../../pages/user/forgot-password';
import Register from '../../pages/user/register';
import HomePage from '../../pages/user/home';
import Header from '../../components/header';
import Footer from '../../components/footer';
import ProductDetail from '../../pages/user/product-id';
import StoreProduct from '../../pages/user/store';
import Payment from '../../pages/user/store/component/payment';

const LayoutBlank  = () => {
    return (
        <Router>
            <Header />
            <Switch>
                <div style={{minHeight: 'calc(100vh - 400px)'}}>
                <Authorzited path="/movies/list" component={MoviesList} />
                <Authorzited path="/movies/create" component={MoviesInsert} />
                <Route
                    path="/movies/update/:id"
                    exact
                    component={MoviesUpdate}
                />
                <Route path="/product/:id"  component={ProductDetail}/>
                <Route path="/store"  component={StoreProduct} />
                <Route path="/payment"  component={Payment} />
                <Route path="/register" exact component={Register} /> 
                <Route path="/forgot" exact component={ForgotPassword} /> 
                <Route path="/" exact component={HomePage} /> 
                </div>
            </Switch>
            <Footer />
        </Router>
    )
}
export default LayoutBlank;
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
import OrderForm from '../../pages/user/follow-order';
import OrderDetail from '../../pages/user/follow-order/follow-order-detail';
import MessengerCustomerChat from 'react-messenger-customer-chat';
const LayoutBlank  = () => {
    return (
        <>
         <MessengerCustomerChat
          pageId="105721911609064"
          appId="286695432832368"
         
        />
        <Router>
            <Header />
            <div style={{minHeight: 'calc(100vh - 400px)'}}>
            {/* <div className="fb-customerchat" id="286695432832368">Chat</div> */}
         
            <Switch>
               
                <Authorzited path="/movies/list" component={MoviesList} />
                <Authorzited path="/movies/create" component={MoviesInsert} />
               
                <Route path="/product/:id"  component={ProductDetail}/>
                <Route path="/store"  component={StoreProduct} />
                <Route path="/payment"  component={Payment} />
                <Route path="/order-form"  component={OrderForm} />
                <Route path="/follow-order-detail" exact  component={OrderDetail} />
                <Route path="/register" exact component={Register} /> 
                <Route path="/forgot" exact component={ForgotPassword} /> 
                <Route path="/" exact component={HomePage} /> 
                
            </Switch>
            </div>
            <Footer />
        </Router>
        </>
    )
}
export default LayoutBlank;
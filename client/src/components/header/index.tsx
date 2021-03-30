import React from "react";
import { Menu , Image} from "antd";
import { Link } from "react-router-dom";
import {AppstoreAddOutlined,SearchOutlined } from '@ant-design/icons';
import './style.scss';
const Header = () => {
  return (
    <>
      <div className="header-top d-flex w-100 justify-content-between">
          <h5 className="header-title">Hệ thống cửa hàng menshop</h5>
        <Menu mode="horizontal" className="menu-top">
          <Menu.Item key="point">
            <Link to="/">Kiểm tra tích điểm</Link>
          </Menu.Item>
          <Menu.Item key="order">
            <Link to="/">Kiểm tra đơn hàng</Link>
          </Menu.Item>
          <Menu.Item key="infor">
            <Link to="/">Tin tức</Link>
          </Menu.Item>
          <Menu.Item key="contact">
            <Link to="/">Liên hệ</Link>
          </Menu.Item>
        </Menu>
      </div>
      <div className="d-flex w-100 justify-content-between header-bottom">
      <Image src={`/images/logo.jpg`}/>
        <Menu mode="horizontal" className="menu">
          <Menu.Item key="point">
            <Link to="/">Giày Nike</Link>
          </Menu.Item>
          <Menu.Item key="order">
            <Link to="/">Giày Adidas</Link>
          </Menu.Item>
          <Menu.Item key="infor">
            <Link to="/">Giày Vans</Link>
          </Menu.Item>
          <Menu.Item key="contact">
            <Link to="/">Giày thời trang</Link>
          </Menu.Item>
        </Menu>
        <Menu mode="horizontal" className="icon">
          <Menu.Item key="point">
            <Link to="/"><i className="fas fa-search"></i></Link>
          </Menu.Item>
          <Menu.Item key="order">
            <Link to="/store"><i className="fas fa-cart-plus"></i></Link>
          </Menu.Item>
        </Menu>
</div>
    </>
  );
};

export default Header;

import React from "react";
import { Menu , Image} from "antd";
import { Link } from "react-router-dom";
import {AppstoreAddOutlined,SearchOutlined } from '@ant-design/icons';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSearch, faCartPlus } from '@fortawesome/free-solid-svg-icons'
import DrawerFormFilter from "../DrawerFormFilter";

const Header = () => {
  const [visible,setVisible] = React.useState<boolean>(false);
  const handleOpenDrawer = () => {
    setVisible(true)
  }
  return (
    <>
      <div className="header-top d-flex w-100 justify-content-between">
          <h5 className="header-title">Hệ thống cửa hàng menshop</h5>
        <Menu mode="horizontal" className="menu-top">
          {/* <Menu.Item key="point">
            <Link to="/">Kiểm tra tích điểm</Link>
          </Menu.Item> */}
          <Menu.Item key="order">
            <Link to="/order-form">Kiểm tra đơn hàng</Link>
          </Menu.Item>
          {/* <Menu.Item key="infor">
            <Link to="/">Tin tức</Link>
          </Menu.Item> */}
          <Menu.Item key="contact">
            <Link to="/">Liên hệ</Link>
          </Menu.Item>
        </Menu>
      </div>
      <div className="d-flex w-100 justify-content-between header-bottom">
      <Image src={`/images/logo.png`}/>
        <Menu mode="horizontal" className="menu">
          <Menu.Item key="1">
            <Link to="/product-filter?loai-giay=1">Giày Nike</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/product-filter?loai-giay=2">Giày Adidas</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/product-filter?loai-giay=3">Giày Vans</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/product-filter?loai-giay=4">Giày thời trang</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/product-filter?loai-giay=5">Giày khác</Link>
          </Menu.Item>
        </Menu>
        <Menu mode="horizontal" className="icon">
          <Menu.Item key="point">
            <Link onClick={handleOpenDrawer}><FontAwesomeIcon icon={faSearch} /></Link>
          </Menu.Item>
          <Menu.Item key="order">
            <Link to="/store"><FontAwesomeIcon icon={faCartPlus} /></Link>
          </Menu.Item>
        </Menu>
        {visible && <DrawerFormFilter visible={visible} setVisible={setVisible}/>}
        
</div>
    </>
  );
};

export default Header;

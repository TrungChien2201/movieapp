import React, {useState} from 'react';
import { Menu, Button } from 'antd';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;
const MenuAdmin = (props: any) => {
    const {collapse,setCollapse} =  props;
    const toggleCollapsed =() => {
        setCollapse(!collapse);
    }
    return (
        <div style={{ width: '100%',height: '100%' }}>
          <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16, marginTop: 16,marginLeft: 23 }}>
            {collapse ? (<MenuUnfoldOutlined />) : (<MenuFoldOutlined />)}
        </Button>
        <Menu
          defaultSelectedKeys={['dashboard']}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapse}
          style={{minHeight: '150vh',transition: 'all 0s'}}
        >
     
          <Menu.Item key="product" icon={<PieChartOutlined />}>
            Sản phẩm
          </Menu.Item>
          <Menu.Item key="order" icon={<DesktopOutlined />}>
            Đơn hàng
          </Menu.Item>
          <Menu.Item key="account" icon={<ContainerOutlined />}>
            Tài khoản
          </Menu.Item>
          <Menu.Item key="dashboard" icon={<ContainerOutlined />}>
            Thống kê
          </Menu.Item>
          <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
            <Menu.Item key="sub2">Option 5</Menu.Item>
            <Menu.Item key="sub3">Option 6</Menu.Item>
            <Menu.Item key="sub4">Option 7</Menu.Item>
            <Menu.Item key="sub5">Option 8</Menu.Item>
          </SubMenu>
          <SubMenu key="sub6" icon={<AppstoreOutlined />} title="Navigation Two">
            <Menu.Item key="sub7">Option 9</Menu.Item>
            <Menu.Item key="sub8">Option 10</Menu.Item>
            <SubMenu key="sub9" title="Submenu">
              <Menu.Item key="sub11">Option 11</Menu.Item>
              <Menu.Item key="sub12">Option 12</Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu>
      </div>
    )
}

export default MenuAdmin;
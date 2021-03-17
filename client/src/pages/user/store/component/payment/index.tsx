import React , {useState} from 'react';
import {Button , Form , Input} from 'antd';
import { useHistory } from 'react-router';
import './style.scss';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
const Payment = (props: any) => {
    const [numbers , setNumbers]: any = useState(1);
    const [country,setCountry] = useState('');
    const [region,setRegion] = useState('');
    const [commune,setCommune] = useState('');
    const history = useHistory();
    console.log(history.location.state)
    const handleKeySale = () => {

    }
    const handleSubmit = (e: any) => {
        
    }

    return ( 
        <div className="container">
           <div>
              <div>Bạn có mã ưu đãi? <p onClick={handleKeySale}>Nhấp vào đây để nhập mã</p></div>
           </div>
           <div className="d-flex row">
               <Form onFinish={handleSubmit}>
               <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                   <h3>Thông tin liên hệ</h3>
                   <Form.Item 
                      label="Họ và tên"
                      name="name"
                      rules={[{required: true, message: 'Value is not null'}]}
                   >
                     <Input />
                   </Form.Item>
                   <Form.Item 
                      label="Số điện thoại"
                      name="phone"
                      rules={[{required: true, message: 'Value is not null'}]}
                   >
                     <Input />
                   </Form.Item>
                   <div>
                   <CountryDropdown
          value={country}
          onChange={(val) => setCountry(val)} />
        <RegionDropdown
          country={country}
          customOptions={['d']}
          value={region}
          onChange={(val) => console.log(val)} />
          
                   </div>
                   <Form.Item 
                      label="Địa chỉ email (tùy chọn)"
                      name="name"
                      rules={[{required: true, message: 'Value is not null'}]}
                   >
                     <Input />
                   </Form.Item>
                   <Form.Item 
                      label="Tỉnh/Thành Phố"
                      name="name"
                      rules={[{required: true, message: 'Value is not null'}]}
                   >
                     <Input />
                   </Form.Item>
                   <Form.Item 
                      label="Họ và tên"
                      name="name"
                      rules={[{required: true, message: 'Value is not null'}]}
                   >
                     <Input />
                   </Form.Item>
                   <Form.Item 
                      label="Họ và tên"
                      name="name"
                      rules={[{required: true, message: 'Value is not null'}]}
                   >
                     <Input />
                   </Form.Item>
                   <Form.Item 
                      label="Họ và tên"
                      name="name"
                      rules={[{required: true, message: 'Value is not null'}]}
                   >
                     <Input />
                   </Form.Item>
               </div>
               <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"></div>
               </Form>
           </div>
        </div>
    )
}
export default Payment;
import React , {useState} from 'react';
import {Button , Form , Input, Select, Spin} from 'antd';
import { useHistory } from 'react-router';
import './style.scss';
import apis from '../../../../../api';
import { Irespone } from '../../../../../constants/interface';
import { SUCCESS } from '../../../../../constants';
import FormatMoney from '../../../../../components/format-money';

const { Option } = Select;
const Payment = (props: any) => {
    const [loading , setLoading] = useState(false);
    const [city,setCity] = useState([]);
    const [district,setDistrict] = useState([]);
    const [commune,setCommune] = useState([]);
    const [address,setAddress] = useState({
       city: '',
       district: '',
       commune: ''
    })
    const [prop,setProp]: any = useState();
    const idUser = localStorage.getItem('id');
    const history = useHistory();
    console.log(history.location.state)
    const handleKeySale = () => {

    }
    const handleSubmit = (e: any) => {
       setLoading(true)
        apis.CreateOrder({idUser: idUser,infor: e, product: prop}).then(({data}: {data: Irespone})=> {
           if(data){
              setLoading(false)
           }
          if(data.status === SUCCESS){
             apis.deleteStore(idUser).then(({data}: {data: Irespone})=>{
                if(data.status === SUCCESS){
                   setProp([])
                   history.push('/order-form')
                }
             })
          }
        })
    }
  React.useEffect(() => {
     apis.getCity().then(({data}: {data: Irespone}) => {
        if(data.status == SUCCESS){
           console.log(data.data)
           setCity(data.data)
        }
       
     });
     
  },[])
  React.useEffect(()=>{
   if(history?.location?.state){
      setProp(history?.location?.state)
     }
     else history.push('/store')
  },[])
  const handleChangeCity = (e: string) => {
     apis.getDistrict(e).then(({data}: {data: Irespone}) => {
        if(data?.status === SUCCESS){
         setDistrict(data.data)
        }
     })
  }

  const handleChangeDistrict = (e: string) => {
   apis.getCommune(e).then(({data} : {data: Irespone})=>{
      if(data?.status === SUCCESS){
         setCommune(data.data)
      }
   })
  }
  console.log('prop',prop)

    return ( 
        <div className="container">
           <div>
              <div>Bạn có mã ưu đãi? <p onClick={handleKeySale}>Nhấp vào đây để nhập mã</p></div>
           </div>
           
               <Form onFinish={handleSubmit} className="form-contact">
               <div className="d-flex row">
               <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                   <h3 className="form-contact_title">Thông tin liên hệ</h3>
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
                   <Form.Item 
                      label="Địa chỉ email (tùy chọn)"
                      name="email"
                      rules={[{required: true, message: 'Value is not null'}]}
                   >
                     <Input />
                   </Form.Item>
                   <Form.Item 
                      label="Tỉnh/Thành Phố"
                      name="city"
                      rules={[{required: true, message: 'Value is not null'}]}
                   >
                     <Select onChange={handleChangeCity} suffixIcon={<i className="fas fa-sort-down"></i>}>
                        {Array.isArray(city) && city.map((item: any)=>(
                           <Option key={item.province_code} value={item.province_name} >{item.province_name}</Option>
                        ))}
                     </Select>
                   </Form.Item>
                   <Form.Item 
                      label="Huyện/Quận"
                      name="district"
                      rules={[{required: true, message: 'Value is not null'}]}
                   >
                     <Select onChange={handleChangeDistrict} suffixIcon={<i className="fas fa-sort-down"></i>}>
                        {Array.isArray(district) && district.map((item: any)=>(
                           <Option key={item.district_code} value={item.district_name} >{item.district_name}</Option>
                        ))}
                     </Select>
                   </Form.Item>
                   <Form.Item 
                      label="Phường/Xã"
                      name="commune"
                      rules={[{required: true, message: 'Value is not null'}]}
                   >
                     <Select suffixIcon={<i className="fas fa-sort-down"></i>}>
                        {Array.isArray(commune) && commune.map((item: any)=>(
                           <Option key={item.ward_code} value={item.ward_name} >{item.ward_name}</Option>
                        ))}
                     </Select>
                   </Form.Item>
                   <Form.Item 
                      label="Địa chỉ"
                      name="address"
                      rules={[{required: true, message: 'Value is not null'}]}
                   >
                     <Input placeholder="vd: số nhà/ngách/ngõ , xóm/thôn"/>
                   </Form.Item>
               </div>
               <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 order-form">
                  <h5 className="form-contact_title">Đơn hàng của bạn</h5>
                 
                 <div className="order-form_order">
                     {Array.isArray(prop?.store) && prop.store.map((el: any)=> (
                     <div key={`${el._id}_iis`} className="d-flex py-2 card-store justify-content-between">
                        
                        <div className="d-flex card-store_infor">
                           <img width={60} height={70} src={el.image} />
                           <div className="card-store_description">{el.nameproduct} - {el.color}, {el.size}</div>
                           <div className="card-store_total"><span>x{el.total}</span></div>
                        </div>
                        
                        <div><FormatMoney money={el.price_sale * el.total} /></div>
                     </div>
                  ))} 
                  <div className="order-form_sumprice"><div>Tạm tính</div><div><FormatMoney money={prop && prop.sum_price} /></div></div>
                  <div className="order-form_sumprice"><div>Phí ship</div><div><FormatMoney money={30000} /></div></div>
                  <div className="order-form_sumprice"><div>Tổng cộng</div><div><FormatMoney money={prop && prop.sum_price + 30000} /></div></div>
                  
               </div>
               <div className="py-3 order-form_text">Bạn đặt hàng và thanh toán sau khi nhân viên bưu điện đưa hàng đến nơi và thu tiền tận nhà bạn</div>
               <Button htmlType="submit" className="order-form_submit">{loading && <Spin />} Đặt hàng</Button>
               </div>
               </div>
               </Form>
           
        </div>
    )
}
export default Payment;
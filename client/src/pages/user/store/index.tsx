import  React , {useState} from 'react';
import apis from '../../../api';
import {Button} from 'antd';
import { Irespone } from '../../../constants/interface';
import './style.scss';
import { useHistory } from 'react-router';
const StoreProduct = () => {
  const userId = localStorage.getItem('id');
  const [store, setStore] = useState([]);
  const [number , setNumber]: any = useState(1);
  const [count, setCount] = useState(0);
  const history = useHistory()
  React.useEffect(()=> {
     apis.getStore(userId).then(({ data }: {data: Irespone}) => {setStore(data?.data?.store);
      const counts =  data?.data?.store.map((el: any) => (el.price_sale * el.total))
      console.log(counts);
      let i;
      let countsss = 0;
      for(i=0; i< counts.length; i++){
        countsss = countsss + counts[i]
      }
       setCount(countsss)
    })
      
    },[])

  
const handlePayment = () => {
    history.push('/payment',{
       sum_price: count,
       store
    })
}
console.log(count)
    return (
        <div className="store-user">
            {!store ? "Chưa có sản phẩm nào trong giỏ hàng": <>
                <table>
                    <thead>
                        <tr>
                        <th>Sản phẩm</th>
                        <th>Giá</th>
                        <th>Hình ảnh</th>
                        <th>Màu</th>
                        <th>Size</th>
                        <th>Số lượng</th>
                        <th>Tổng</th>
                        <th></th>
                        </tr>
                        
                    </thead>
                
                <tbody>
                {
                    Array.isArray(store) && store?.map((item: any, index: number)=> (
                        
                       <tr key={index}>
                        <td>
                             {item.nameproduct}
                         </td> 
                         <td>
                             {item.price_sale}đ
                         </td>      
                        <td>
                            <img width={50} src={item.image} />
                        </td>
                        <td>{item.color}</td>
                        <td>{item.size}</td>
                        <td>{item.total}</td>
                        <td>{item.price_sale * item.total}đ</td>
                        <td><Button style={{border: 'none',color: '#c51212'}}><i className="far fa-trash-alt"></i></Button></td>
                         </tr>    
                         
                    ))
                }
                <tr>
                    <td></td>
                    <td colSpan={2}><Button onClick={handlePayment} className="btn-payment">Thanh toán</Button></td>

                    <td></td>
                    <td></td>
                    <td></td>
                    <td><strong>SUM = {count}đ</strong></td>
                    <td></td>
                </tr>
                </tbody>
                </table>
            </>}
        </div>
    )
}

export default StoreProduct
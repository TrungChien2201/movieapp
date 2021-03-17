import React, { useState } from "react";
import { useHistory, useParams } from "react-router";
import apis from "../../../api";
import { Image, Button, Collapse } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import "./style.scss";
import 'font-awesome/css/font-awesome.min.css';
import { SUCCESS } from "../../../constants";
const { Panel } = Collapse;
const ProductDetail = () => {
  const params: any = useParams();
  const [product, setProduct]: any = useState({});
  const [color, setColor]: any = useState("");
  const [size, setSize]: any = useState("");
  const [number,setNumber] = useState(1);
  const history = useHistory();
  React.useEffect(() => {
    apis.getProductDetail(params.id).then((resp) => setProduct(resp.data.data));
  }, [params]);

  const handleColor = (e: string) => {
    setColor([{ key: e }]);
  };

  const handleSize = (e: string) => {
    setSize([{ key: e }]);
  };

  const renderDescription = (value: string) => {
      console.log(value?.[0])
      if(value?.includes('\n')){
          const data = value?.replace('\n', '\n * ') 
        return data
      }
      return value?.replace('\n', '\n * ')
    //  return data;
  }

  const handleSubtraction = () => {
    if(number > 1){
      setNumber(number - 1)
    }
    
  }

  const handleAddition = () => {
    setNumber(number + 1)
  }

  const userId = localStorage.getItem('id');
  const handleSubmit = () => {
     apis.CreateStore({id: userId, store: {
       _id: params.id ,
       nameproduct: product.title,
       price_sale: product.price_sale,
       color: color[0].key,
       size: size[0].key , 
       image: product.image,
       total: number
      }})
      .then((resp: any) => {
        if(resp.data.status === SUCCESS){
          history.push('/store')
        }
      })
  }

  const note_data = [
      {icon: <i className="far fa-check-circle"></i>, title: 'Chất lượng sản phẩm?', text: 'Sản phẩm luôn được MENSHOP kiểm định, đánh giá với chất lượng cao nhất trước khi đến tay khách hàng!'},
      {icon: <i className="fas fa-adjust"></i>, title: 'Sai màu sản phẩm?', text: 'Vì 1 số yếu tố khách quan như độ sáng màn hình, chất lượng màn hình nên sản phẩm có thể ko đúng màu.'},
      {icon: <i className="fas fa-medal"></i>,title: 'Hàng có sẵn không?' ,text: 'Sản phẩm hiện có sẵn tại hệ thống cửa hàng XSHOP và online tại website.'},
      {icon: <i className="fas fa-thumbs-up"></i>,title: 'Bảo hành sản phẩm' ,text: 'Sản phẩm được bảo hành trong 30 ngày với bất kỳ lỗi nào. Hàng SALE không được bảo hành.'},
      {icon: <i className="far fa-clock"></i>,title: 'Thời gian giao hàng?',text: 'Chúng tôi sử dụng đơn vi vận chuyển uy tín và nhanh chóng nhất, thời dự kiến từ 1-4 ngày tuy khu vực.'},
      {icon: <i className="fas fa-clock"></i>,title: 'Thời gian làm việc?',text: 'Hệ thống cửa hàng và Online làm việc từ 8:30 - 22:00 hàng ngày.'},
      {icon: <i className="fas fa-history"></i>,title: 'Đổi hàng như thế nào?',text: 'Việc đổi hàng rất dễ dàng và chúng tôi luôn muốn khách hàng ưng ý nhất. Hãy liên hệ fanpage để đổi!'},
      {icon: <i className="fas fa-expand-alt"></i>,title: 'Chọn sai size giày?',text: 'Bạn có thể qua cửa hàng hoặc gửi lại để đổi hàng với sản phẩm mới 100%. Còn nguyên tem mác, hoá đơn mua hàng.'},
  ]
  console.log(color, "color");
  return (
      <>
    <div className="page-detail d-flex">
      <div className="slide-image col-6">
        <Image
          style={{ objectFit: "cover" }}
          width="90%"
          height={800}
          src={`${product?.image}`}
        />
      </div>
      <div className="col-6 description-product">
        <div className="description-product_layout">
          <h2 className="description-product_title">{product.title}</h2>
          <p className="description-product_intro">
            Chất liệu cao cấp, bền đẹp theo thời gian. Thiết kế thời trang. Kiểu
            dáng phong cách độ bền cao. Dễ phối đồ.
          </p>
          <p>
            <span className="description-product_price">{product.price}đ</span>{" "}
            <span className="description-product_price-sale">
              {product.price_sale}đ
            </span>
          </p>
          <h5 className="description-product_label">Màu sắc</h5>
          <div className="description-product_content">
            {Array.isArray(product.color) &&
              product.color.map((el: any, index: number) => (
                <Button
                  className={color[0]?.key === el ? "btn-color" : "btn-default"}
                  onClick={() => handleColor(el)}
                  key={index}
                >
                  {el}
                </Button>
              ))}
          </div>
          <h5 className="description-product_label">Kích cỡ</h5>
          <div className="description-product_content">
            {Array.isArray(product.size) &&
              product.size.map((el: any, index: number) => (
                <Button
                  className={size[0]?.key === el ? "btn-color" : "btn-default"}
                  onClick={() => handleSize(el)}
                  key={index}
                >
                  {el}
                </Button>
              ))}
          </div>
          <h5 className="description-product_label">Số lượng</h5>
          <><Button onClick={handleSubtraction}>-</Button> <span className="px-2">{number}</span> <Button onClick={handleAddition}>+</Button></>
          <div className="w-100">
            <Button onClick={handleSubmit} disabled={!color || !size} className="btn-submit">
              <p>Mua ngay</p>
              <span>Giao tận nhà - Đổi trả dễ dàng</span>
            </Button>
            <Collapse
              className="mt-4"
              accordion
              expandIconPosition="right"
              expandIcon={(props: any) => {
                console.log(props);
                if (props.isActive) {
                  return (
                    <a
                      style={{ color: "black", fontSize: "20px" }}
                      onClick={(e) => {}}
                    >
                      -
                    </a>
                  );
                } else {
                  return (
                    <a
                      style={{ color: "black", fontSize: "16px" }}
                      onClick={(e) => {}}
                    >
                      +
                    </a>
                  );
                }
              }}
            >
              <Panel header="Chính sách giao hàng & đổi trả" key="1">
                <div className="exchange">
                    <p><i className="fas fa-truck "></i> Giao hàng hoàn toàn miễn phí 100%</p>
                    <p><i className="fas fa-shield-alt"></i> An toàn với nhận hàng và trả tiền tại nhà</p>
                    <p><i className="fas fa-exchange-alt"></i> Bảo hành đổi trả trong vòng 60 ngày</p>

                </div>
              </Panel>
              <Panel header="Hướng dẫn bảo quản" key="2">
                <div className="preservation">
                    <p className="preservation-label">* Khử mùi bên trong giày</p>
                    <div>
                        Bạn hãy đặt túi đựng viên chống ẩm vào bên trong giày để hút ẩm và rắc phấn rôm(có thể thay bằng cách đặt vào bên trong giày gói trà túi lọc chưa qua sử dụng) để khử mùi, giúp giày luôn khô thoáng. <br />
                        Để hạn chế mùi hôi và sự ẩm ướt cho giày, hãy chọn vớ chân loại tốt, có khả năng thấm hút cao. Ngoài ra, dùng các loại lót giày khử mùi cũng là một phương pháp tốt.
                    </div>
                    <p className="preservation-label mt-3">* Bảo quản khi không sử dụng</p>
                    <div>
                        Khi sử dụng giày, bạn đừng vội vứt hộp đi mà hãy cất lại để dành. Khi không sử dụng, nhet một ít giấy vụn vào bên trong giày để giữ cho dáng giày luôn chuẩn, đẹp . Sau đó đặt giày vào hộp bảo quản cùng túi hút ẩm.
                    </div>
                </div>
              </Panel>
            </Collapse>
            <h5 className="contact-switchboard mt-3">
              Tổng đài bán hàng{" "}
              <span>
              <i className="fas fa-phone-square-alt"></i> 035.397.xxxx
              </span>
            </h5>
            <p className="contact-text">Hỗ trợ 24/7 mỗi ngày</p>
          </div>
        </div>
      </div>
    </div>
    <div className="container-fluid">
    <div className="note-description">
       <h5 className="note-content_title">Mô tả</h5>
       <p className="description-text mt-5">* {renderDescription(product.description)}</p>
       </div>
    <div className="note-content row px-3">
        {note_data && note_data?.map((item: any,index: number) => (
        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 d-flex py-3" style={{alignItems: 'center'}}>
           <div className="note-content_icon">{item.icon}</div>
           <div className="note-content_text">
               <p className="note-content_text-title mb-0">{item.title}</p>
               <p className="note-content_text-content mb-0">{item.text}</p>
           </div>
        </div>
        ))}
        </div>
    </div>
    </>
  );
};

export default ProductDetail;
import React from "react";
import Iframe from "react-iframe";
import "./style.scss";
const Footer = () => {
  return (
    <div className="footer">
      <div className="container px-0">
        <div className="row">
          <div className="col-12 col-sm-12 col-md-8 col-lg-4 col-xl-4 pl-0 footer-infor_shop">
            <img className="logo" src="/images/logo.png" />
            <div className="d-flex mt-4">
              <p className="footer-infor_shop-label">Hotline:</p>
              <p className="footer-infor_shop-content">035.397.1100</p>
            </div>
            <div className="d-flex">
              <p className="footer-infor_shop-label">Store1:</p>
              <p className="footer-infor_shop-content">xx Ha Noi , Viet Nam</p>
            </div>
            <div className="d-flex">
              <p className="footer-infor_shop-label">Store2:</p>
              <p className="footer-infor_shop-content">
                xx Hai Bà Trưng , Hà Nội , Viet Nam
              </p>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-4 col-lg-2 col-xl-2 footer-service">
            <h5>Hỗ Trợ</h5>
            <div className="footer-list-option">
              <div>7 cách bảo quản giày thể thao tốt nhất</div>
              <div>Giữ "phong độ" cho Sneaker trắng ra sao</div>
              <div>9 kỹ thuật làm đẹp dành cho U30</div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-4 col-lg-2 col-xl-2 footer-service">
            <h5>Dịch vụ khách hàng</h5>
            <div className="footer-list-option">
              <div>Giới thiệu MENSHOP</div>
              <div>Hướng dãn đặt hàng</div>
              <div>Chính sách đổi trả và bảo hành</div>
              <div>Liên hệ MENSHOP</div>
              <div>Hệ thống cửa hàng</div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-8 col-lg-4 col-xl-4 pr-0 footer-iframe">
            <h5 className="footer-iframe_title">MENSHOP trên facebook</h5>
            <Iframe
              url="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FMenshop-105721911609064&tabs=timeline&width=371&height=127&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
              width="100%"
              height="100%"
              position="relative"
              className="iframe-facebook"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;

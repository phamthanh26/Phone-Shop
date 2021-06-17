import './styles.css'
import { Row, Col} from 'antd';
function Footer() {
    return (
      <div className="footer">
         <Row>
           <Col span={6}>
             <div className="footer-right">
              <h2> LIÊN HỆ VỚI ZPHONE</h2>
              <h3>Hotline CSKH: 1600 2536</h3>
              {/* <p style={{fontSize : '12px'}}>Bản quyền ©2021 Samsung bảo lưu mọi quyền.
Công ty TNHH Điện Tử Zphone
Giấy CNĐT: 411043002319, do UBND TP HCM cấp ngày 26/6/2021
</p> */}
             </div>
           </Col>
           <Col span={6}>
             <h3>Bạn Cần Hỗ Trợ?</h3>
          <p>Liên hệ</p>
          <p>Hỗ trợ dịch vụ</p>
          <p>Hỗ trợ trực tuyến</p>
          <p>Email</p>
          {/* <p>Điện thoại</p> */}
       
           </Col>
           <Col span={6}>
             <h3>Tài khoản & Cộng đồng</h3>
             <p>Tài khoản của tôi</p>
             <p>Đơn hàng</p>
             <p>Danh sách yêu thích</p>
           </Col>
           <Col span={6}>
             <h3>KẾT NỐI VỚI CHÚNG TÔI</h3>
             <img src="https://img.icons8.com/ios-filled/50/000000/facebook.png"/>
             <img src="https://img.icons8.com/ios-filled/50/000000/instagram-new.png"/>
           </Col>
           </Row> 
      </div>
    );
  }
  
  export default Footer;

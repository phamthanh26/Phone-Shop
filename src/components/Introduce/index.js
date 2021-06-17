import './style.css'
import { Row, Col } from 'antd';
function Introduce() {
    return (
        <div>
            <p className="contact">Zphone sẵng sàng hỗ trợ bạn!</p>
            <img src="https://images.samsung.com/is/image/samsung/assets/vn/support/contact/Contact_Us_KV_1440x640.jpg.jpg?$ORIGIN_JPG$" />

            <div className="introduce">
                <h2 style={{ textAlign: 'center', margin: '20px 20px', fontSize: '30px' }}>Thông Tin Liên Hệ</h2>
                <Row>
                    <Col>
                        <div className="contact-01">
                            <h1>Gọi Điện Thoại</h1>
                            <h4>Hỗ trợ sản phẩm và dịch vụ Samsung</h4>
                          
                            <h4>1800 588 855 (thiết bị di động)</h4>
                            <h4>
                                Giờ làm việc:</h4>
                            <h4>24 giờ, 7 ngày trong tuần. Miễn cước h4hí</h4>
                            <button className="contact-btn"> 1800 588 889 (tất cả)</button>
                            <button className="contact-btn01"> 1800 588 889 (thiết bị di động)</button>
                        </div>
                    </Col>
                    <Col>
                        <div className="contact-01">
                            <h1>Trung Tâm Bảo Hành</h1>
                            <h4>Tìm kiếm Trung Tâm Bảo Hành gần bạn nhất</h4>
                            <button className="contact-btn02"> Tìm trung tâm bảo hành</button>
                            <button className="contact-btn03"> Giao nhận tận nơi(điện thoại)</button>
                        </div>
                    </Col>
                    <Col>
                        <div className="contact-01">
                    <h1>Dành Cho Khách Hàng Doanh Nghiệp</h1>
                    <h4>1800-588-890 (dành cho khách hàng doanh nghiệp)</h4>
                    <h4>Giờ làm việc:
24 giờ, 7 ngày trong tuần. Miễn cước phí</h4>
<button className="contact-btn04"> 1800 1525</button>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Introduce;

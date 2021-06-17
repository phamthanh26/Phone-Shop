import { Col, Rate ,Card , Row } from 'antd';
import '../style.css'

import history from '../../../../utils/history';

function renderProductList(props) {
    const { name, price, img, id, description, unit, rate, count ,priceSale } = props;
   
    console.log("🚀 ~ file: index.js ~ line 41 ~ renderProductList ~ rate", rate)
      return (
        <Col xs={24 } sm={12} md={ 12 } lg={6}>
          <Card
            onClick={() => history.push(`/product/${id}`)}
            // style={{ overflow: 'hidden'}}
            bordered={false}
            hoverable
            // cover={img}
            size="small"
          > 
          {/* <div style={{padding:'15px 15px 0px 15px'}}> */}
            <Row>
              <Col span={24}>
                <p className='sale'>Trả góp 0%</p>
              </Col>
              <Col span={24}>
                <img style={{ height: '240px', width: '240px' }} onClick={() => history.push(`/product/${id}`)} src={img} />
                <h4 style={{ fontSize: '17px' }}>{name} </h4>
                <Row>
                  <Col span={12}>
                  <h4 style={{ color: 'red', textAlign: 'left', fontSize: '15px' }}>{(price).toLocaleString()}₫ </h4>
                  </Col>
                  <Col span={12}>
                  <h4 style={{ textAlign: 'right', fontSize: '12px', textDecoration: 'line-through' }}>{(priceSale).toLocaleString()}₫</h4>
                  </Col>
                </Row>
              </Col>
            </Row>
          {/* </div> */}
                <Row>
                  <Col span={12}>
                    <div className="product-rate">
                 <Rate    disabled  value={rate} className="aaa"/> 
                 <div className="product-rate-count"> {count}</div>
                    </div>
                  </Col>
                  <Col span={12}>
                    <button className="button-product-add">Xem chi tiết</button>
                  </Col>
                </Row>
          </Card>
        </Col>
      )
  }
export default renderProductList;
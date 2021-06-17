import '../style.css'
import { Card, Row, Col, Image } from 'antd';
function CartItem(props) {
  const {
    id,
    title,
    idColor,
    idGb,
    name,
    priceOption,
    Capacity,
    price,
    img,
    count,
    productId,
    handleIncrease,
    handleDecrease,
    handleDeleteItem
  } = props;

  return (
    <div className="b">
      <Card className="card-01">
        <div className="a">
          <Row>
            <Col xs={4} sm={4} md={4} lg={4} className="w100">
              Hình ảnh
            </Col >
            <Col xs={7} sm={7} md={7} lg={7} className="w100">
              Sản phẩm
            </Col>
            <Col xs={7} sm={7} md={7} lg={7} className="w100">
              Số lượng
            </Col>
            <Col xs={6} sm={6} md={6} lg={6} className="w100">
              Giá tiền
            </Col>
          </Row>
        </div>
        <div>
          <Row>
            {/* Ảnh */}
            <Col xs={4} sm={4} md={4} lg={4}>
              <Image
                className="cart-item-img"

                src={img}
              />
            </Col>
            {/* Tên sản phẩm */}
            <Col xs={8} sm={8} md={8} lg={8}>
              <div className="card-main-main">
                <p className="card-name-01">{name}  </p>
                <h5>Màu sắc: {title ? (title) : ""}</h5>
                <h5>Dung lượng: {Capacity}</h5>
              </div>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
              {/* tăng SL */}
              <div className="card-main-main">
                <img className="card-number"

                  src="https://img.icons8.com/pastel-glyph/64/000000/plus--v2.png"

                  onClick={() => {
                    handleIncrease(
                      id,
                      {
                        id: id,
                        productId: productId,
                        name: name,
                        price: price,
                        img: img,
                        count: count,
                        option: {
                          idGb: idGb,
                          idColor: idColor,
                          price: priceOption,
                          Capacity: Capacity,
                          title: title
                        }
                      })
                  }} />

                {/* SL */}
                <input value={count} className="card-number-00" />
                {/* Giảm SL */}
                {count > 1 ? <img className="card-number1" src="https://img.icons8.com/pastel-glyph/64/000000/minus--v2.png"
                  onClick={() => {
                    handleDecrease(
                      id,
                      {
                        id: id,
                        productId: productId,
                        name: name,
                        price: price,
                        img: img,
                        count: count,
                        option: {
                          idGb: idGb,
                          idColor: idColor,
                          price: priceOption,
                          Capacity: Capacity,
                          title: title
                        }
                      })
                  }} /> :
                  <img className="card-number1" src="https://img.icons8.com/pastel-glyph/64/000000/minus--v2.png" />
                }
              </div>
            </Col>
            {/* Gía & Xóa */}
            <Col xs={6} sm={6} md={6} lg={6} style={{ display: 'block' }}>
              <h5 className="item-price">
                {((priceOption) * (count)).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
              </h5>

              <p style={{ fontSize: '15px', marginLeft: '30px', color: 'red', textAlign: 'right', textDecoration: 'underline' }} onClick={() => {
                handleDeleteItem(
                  id,
                  {
                    productId,
                    name: title,
                    price: price,
                    img: img,
                    count: count
                  })
              }}>XÓA</p>
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  )
}

export default CartItem
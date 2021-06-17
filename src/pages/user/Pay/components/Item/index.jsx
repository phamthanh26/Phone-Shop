import { Button,Row,Col } from 'antd';
import React from 'react';
import './styles.css'

function Item(props) {
    const { cartItem } = props;
    const productPrice = (cartItem.productPrice );
    // const total = productPrice * cartItem.productQuantity;
    
    return (
        <div className="oder-pay-0">
        <div className="a">
        <Row>
        <Col xs={4 } sm={4} md={ 4 } lg={4} className="w100">
          Hình ảnh
        </Col >
        <Col xs={7 } sm={7} md={ 7 } lg={7} className="w100">
          Sản phẩm
        </Col>
        <Col xs={7 } sm={7} md={ 7 } lg={7} className="w100">
          Số lượng
        </Col>
        <Col  xs={6 } sm={6} md={ 6 } lg={6} className="w100">
          Giá tiền
        </Col>
        
        </Row>
      </div>
           <div className='itemOrder'>
             
             <Row>
               <Col xs={4 } sm={4} md={ 4 } lg={4}>
          <img className="itemImg" src={cartItem.img} />
               </Col>
               <Col xs={8 } sm={8} md={ 8 } lg={8}>
            <p className="itemName">{cartItem.name}</p>
            <h5>Màu sắc : {cartItem.option.title}</h5>
            <h5>Dung lượng : {cartItem.option.Capacity}</h5>

         
               </Col>
               <Col xs={6 } sm={6} md={ 6 } lg={6}>
              <span>Số lượng: {cartItem.count} </span>
               </Col>
               <Col xs={6 } sm={6} md={ 6 } lg={6}>
              <span>{((cartItem.count) * cartItem.option.price).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} </span>
               </Col>
             </Row>
         
        </div>
        </div>
    )

}
export default Item;
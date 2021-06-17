import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {  Button, notification, Row, Col, Steps } from 'antd';
import { addToCartAction, deleteItemCartAction } from '../../../redux/actions'
import history from '../../../utils/history';

import CartItem from './CardItem/CartItem'
import './style.css';

function CartListPage({
  cartList,
  addToCart,
  deleteItemCart
}) {

  const { Step } = Steps;
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // Tăng số lượng 
  function handleIncrease(id, productDetail) {
    const existOptionIndex = cartList.data.findIndex((item) => item.id === id);
    const newCartList = cartList.data;
    newCartList.splice(existOptionIndex, 1, {
      id: productDetail.id,
      productId: productDetail.productId,
      count: cartList.data[existOptionIndex].count + 1,
      name: productDetail.name,
      price: productDetail.price,
      img: productDetail.img,
      option: {
        idColor: productDetail.option.idColor,
        idGb: productDetail.option.idGb,
        title: productDetail.option.title,
        price: productDetail.option.price,
        Capacity: productDetail.option.Capacity,
      }
    })
    addToCart({
      userId: userInfo.id,
      carts: newCartList,
    })
  }
  // Giảm số lượng
  function handleDecrease(id, productDetail) {
    const indexOfProduct = cartList.data.findIndex((item) => item.id === id);
    const newCartList = cartList.data;
    newCartList.splice(indexOfProduct, 1, {
      id: productDetail.id,
      productId: productDetail.productId,
      count: cartList.data[indexOfProduct].count - 1,
      name: productDetail.name,
      price: productDetail.price,
      img: productDetail.img,
      option: {
        idColor: productDetail.option.idColor,
        idGb: productDetail.option.idGb,
        title: productDetail.option.title,
        price: productDetail.option.price,
        Capacity: productDetail.option.Capacity,
      }
    })
    addToCart({
      userId: userInfo.id,
      carts: newCartList,
    })
  }
  // Xóa giỏ hàng
  function handleDeleteItem(id) {
    const indexOfProduct = cartList.data.findIndex((item) => item.id === id);
    const newCartList = cartList.data;
    newCartList.splice(indexOfProduct, 1);
    deleteItemCart({
      userId: userInfo.id,
      carts: newCartList,
    })
    notification.success({
      message: 'Xóa sản phẩm thành công!',
    });
  }

  // render card 
  function renderCartList() {
    if (cartList.load) return <p>Loading...</p>;
    return cartList.data.map((item) => {
      return (
        <CartItem
          id={item.id}
          name={item.name}
          idGb={item.option.idGb}
          idColor={item.option.idColor}
          price={item.price}
          img={item.img}
          count={item.count}
          title={item.option.title}
          Capacity={item.option.Capacity}
          priceOption={item.option.price}
          productId={item.productId}
          handleIncrease={handleIncrease}
          handleDecrease={handleDecrease}
          handleDeleteItem={handleDeleteItem}
        />
      )
    })
  }
  //render giá
  function showTotalOrder() {
    var total = 0
    if (cartList.data.lenth === 0) return 0
    cartList.data.forEach((item) => {
      total = total + (item.option.price) * item.count
    })
    return total.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
  }
  // thuế 
  function tax() {
    var total = 0
    if (cartList.data.lenth === 0) return 0
    cartList.data.forEach((item) => {
      total = (total + (item.option.price) * item.count) * 1.1
    })
    return total.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
  } 

  return (
    <div className="card-final">
      <div className="card-steps" >
        <Steps current={0} percent={60} >
          <Step />
          <Step />
          <Step />
        </Steps>
      </div>
      <div className='card-main'>
        <div className="card-left">
          <div>
            {cartList.data.length > 0 ? <h1 className="card-name-w">GIỎ HÀNG</h1> : ""}
            {
              userInfo ?
                <div>
                  {
                    cartList.data.length > 0 ? <div className="cart">   {renderCartList()} </div> :
                      <div style={{ textAlign: 'center', marginTop :'50px' }}>    <img src="https://img.icons8.com/ios/50/000000/sad.png" />
                        <h1 style={{ textAlign: 'center', marginBottom: '100px' }}>Giỏ hàng của bạn trống</h1>
                      </div>
                  }
                  <h3 onClick={() => history.push('/product')} style={{ textDecoration: 'underline', fontSize: '17px', textAlign: 'left' }}>Tiếp tục mua hàng</h3>
                </div>
                : <h1 style={{ textAlign: 'center', marginTop: '100px', height : '300px' }}>Bạn cần đăng nhập để xem giỏ hàng</h1>
            }
          </div>
        </div>
        {userInfo ?

<Row>
          <Col span={16} style={{ width: '100%', height: "300px" }}>
          </Col>
          <Col span={8} style={{ width: '100%', height: "300px" }}>
            <div className="card-order-main">

              <div style={{ display: 'flex' }}>
                <p className="card-pay-01">  Tổng giá trước thuế:</p>
                <h3 className="card-pay-02"> {showTotalOrder()}</h3>
              </div>
              <div style={{ display: 'flex' }}>
                <p className="card-pay-01">  Thuế GTGT:</p>
                <h3 className="card-pay-03"> 10%</h3>
              </div>
              <div style={{ display: 'flex', marginBottom: '20px' }}>
                <h3 className="card-pay-01"> Thành Tiền : </h3>
                <h3 className="card-pay-04"> {tax()}</h3>
              </div>
              {
                userInfo && cartList.data.length > 0 ?
                  <Button className="button-w2" onClick={() => { history.push('/order') }} >THANH TOÁN</Button> :
                  <Button className="button-w2" >THANH TOÁN</Button>
              }
            </div>
          </Col>
        </Row> : ""
        }
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { cartList } = state.cartReducer;
  return {
    cartList,
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (params) => dispatch(addToCartAction(params)),
    deleteItemCart: (params) => dispatch(deleteItemCartAction(params)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CartListPage);

import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Form, Input, Select, Tooltip, Steps, Button, Space, Typography, notification, Row, Col } from 'antd';

import 'moment/locale/vi'
import history from '../../../utils/history';
import './pay.css'
import { connect } from 'react-redux';
import {
  getProductListAction,
  getOrderListAction,
  getCityAction,
  getDistrictAction,
  getWardAction,
  addAddressAction,
  addToOrderAction
} from '../../../redux/actions'


import Item from '../Pay/components/Item';


import moment from 'moment';

const { Option } = Select;

function CheckOutPage({
  addToOrder,
  cartList,
  getOrderList,
  city,
  district,
  ward,
  getCity,
  getDistrict,
  getWard,
}) {
  const userInfoLocalStorage = JSON.parse(localStorage.getItem('userInfo')) || {};

  useEffect(() => {
    getCity();
    getDistrict();
    getWard();
    getOrderList({
      page: 1,
      limit: 10,
      userId: userInfoLocalStorage.id

    });
  }, []);
  const { Step } = Steps;
  const [isSelected, setIsSelected] = useState(false);

  const [isOnChangeCity, setIsOnChangeCity] = useState(false);
  const [isOnChangeDistrict, setIsOnChangeDistrict] = useState(false);
  const [isOnChangeWard, setIsOnChangeWard] = useState(false);

  const [cityCode, setCityCode] = useState('');
  const [districtCode, setDistrictCode] = useState('');
  const [wardCode, setWardCode] = useState('');

  const [cityName, setCityName] = useState('Chưa chọn mã vùng');
  const [districtName, setDistrictName] = useState('');
  const [wardName, setWardName] = useState('');

  useEffect(() => {
    getDistrict({ parentcode: cityCode });
  }, [cityCode]);

  useEffect(() => {
    getWard({ parentcode: districtCode });
  }, [districtCode]);

  const { Title } = Typography;

  const [fillBill, setFillBill] = useState({
    userName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    userId: userInfoLocalStorage.id
  })

  const [checkoutError, setCheckoutError] = useState({
    userName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
  })


  let grandTotal = 0

  function handleChange(e) {
    const { name, value, checked, type } = e.target;
    setFillBill({
      ...fillBill,
      [name]: type === "checkbox" ? checked : value,
    });
  }



  function handleCheckout() {
    let isValid = true;

    const newCheckoutError = {
      userName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      district: "",
      ward: "",
    }

    if (fillBill.userName.trim().length === 0) {
      newCheckoutError.userName = "Vui lòng không để trống";
      isValid = false;
    } else {
      newCheckoutError.userName = "";
    }

    if (fillBill.email.trim().length === 0) {
      newCheckoutError.email = "Vui lòng không để trống";
      isValid = false;
    } else {
      newCheckoutError.email = "";
    }

    if (fillBill.phone.trim().length === 0) {
      newCheckoutError.phone = "Vui lòng không để trống";
      isValid = false;
    } else {
      newCheckoutError.phone = "";
    }


    if (fillBill.address.trim().length === 0) {
      newCheckoutError.address = "Vui lòng không để trống";
      isValid = false;
    } else {
      isValid = true;
      newCheckoutError.address = "";
    }

    if (!isOnChangeCity) {
      isValid = false;
      newCheckoutError.city = "Vui lòng không để trống";
    } else {
      isValid = true;
      newCheckoutError.city = "";
    }

    if (!isOnChangeDistrict) {
      isValid = false;
      newCheckoutError.district = "Vui lòng không để trống";
    } else {
      isValid = true;
      newCheckoutError.district = "";
    }

    if (!isOnChangeWard) {
      isValid = false;
      newCheckoutError.ward = "Vui lòng không để trống";
    } else {
      isValid = true;
      newCheckoutError.ward = "";
    }
    if (isValid) {
      const orderInforAddress = {
        status: "waiting",
        address: `${cityName} - ${districtName} - ${wardName}`,
        userName: fillBill.userName,
        email: fillBill.email,
        phone: fillBill.phone,
        addressName: fillBill.address,
        userId: fillBill.userId,
        totalPrice: grandTotal,
        date: moment().format('LL'),
        time: moment().format('LT'),
        carts: cartList.data
      }
      addToOrder(orderInforAddress);
      history.push('./done')
    } else {
      setCheckoutError({ ...newCheckoutError });
    }
  }
  
  function onChangeSelectedCity(value) {
    setIsOnChangeCity(true)
    const cityF = city.data.filter((item) => item.code === value);
    setCityName(cityF[0].name);
    setCityCode(value);
    setIsSelected(true)
  }


  function onChangeSelectedDistrict(value) {
    setIsOnChangeDistrict(true)
    const districtFiltered = district.data.filter((item) => item.code === value);
    setDistrictName(districtFiltered[0].name);
    setDistrictCode(value);
    setIsSelected(true)
  }
  function onChangeSelectedWard(value) {
    setIsOnChangeWard(true)
    const wardFiltered = ward.data.filter((item) => item.code === value);
    setWardName(wardFiltered[0].name);
    setWardCode(value);
    setIsSelected(true)
  }

  function renderCity() {
    return city.data.map((cityItem, cityIndex) => {
      return (
        <Option key={cityIndex} value={cityItem.code}>{cityItem.name}</Option>
      );
    })
  }

  function renderDistrictOfCity() {
    return district.data.map((districtItem, districtIndex) => {
      return (
        <Option key={districtIndex} value={districtItem.code}>{districtItem.name}</Option>
      );
    })
  }

  function renderWardOfDistrict() {
    return ward.data.map((wardItem, wardIndex) => {
      return (
        <Option key={wardIndex} value={wardItem.code}>{wardItem.name}</Option>
      );
    })
  }

  function renderCheckOut() {
    if (cartList.load) return <p>Loading...</p>;
    return (
      cartList.data.map((cartItem, cartIndex) => {
        const productPrice = ((cartItem.option.price)) * (cartItem.count);
        grandTotal = (grandTotal + productPrice) * 1.1;
        return (
          <Item
            key={cartItem.productId}
            cartItem={cartItem}
          />
        )
      })
    );
  }
  return (
    <>

      <div style={{ backgroundColor: 'white' }}>
        <div style={{ margin: '0px 50px 0px 50px' }}>
          <div className="oder-steps-pay" >
            <Steps current={1} percent={60} >
              <Step />
              <Step />
              <Step />
            </Steps>
          </div>
          <Row>
            <Col span={16}>
              <div style={{ marginTop: '15px' }}>
                <div >
                  <Title level={2}>Đơn Hàng</Title>
                </div>
                <div>
                  {renderCheckOut()}
                  <h3 onClick={() => history.push('/carts')} style={{ textDecoration: 'underline', fontSize: '17px', textAlign: 'left' }}>Quay lại đơn hàng</h3>
                </div>
              </div>
            </Col>
            <Col span={8}>

              <div className="checkout-main-left">
                <div className="checkout-main-right">
                  <div className="bill-title">
                    <Title style={{ marginTop: '15px', fontSize: '30px' }} >Địa chỉ nhận hàng</Title>
                  </div>

                  <div >
                    <div className="checkout-right-input" >
                      <Row>
                        <Col span={8}>
                          <label htmlFor="userName" className="">
                            Họ và Tên
                    <span style={{ color: 'red' }}>*</span>
                          </label>
                        </Col>
                        <Col span={16}>
                          <input className="checkout-right-input-01" type="text" placeholder="Tên" name="userName" onChange={(e) => handleChange(e)} />
                          <div className="text-warning">{checkoutError.userName}</div>
                        </Col>
                      </Row>
                    </div>
                    <div className="checkout-right-input">
                      <Row>
                        <Col span={8}>
                          <label htmlFor="email">
                            Địa chỉ email
                    <span style={{ color: 'red' }}>*</span>
                          </label>
                        </Col>
                        <Col span={16}>
                          <input className="checkout-right-input-01" type="text" placeholder="Địa chỉ email" name="email" onChange={(e) => handleChange(e)} />
                          <div className="text-warning">{checkoutError.email}</div>
                        </Col>
                      </Row>
                    </div>

                    <div className="checkout-right-input">
                      <Row>
                        <Col span={8}>
                          <label htmlFor="phone">
                            Số điện thoại
                    <span style={{ color: 'red' }}>*</span>
                          </label>
                        </Col>
                        <Col span={16}>
                          <input className="checkout-right-input-01" type="text" placeholder="Số điện thoại" name="phone" onChange={(e) => handleChange(e)} />
                          <div className="text-warning">{checkoutError.phone}</div>
                        </Col>
                      </Row>
                    </div>
                    <div className="checkout-right-input">
                      <Row>
                        <Col span={8}>
                          <label htmlFor="address">
                            Tỉnh/Thành Phố
                    <span style={{ color: 'red' }}>*</span>
                          </label>
                        </Col>
                        <Col span={16}>
                          <Select
                            className="checkout-right-input-02"
                            showSearch
                            style={{ width: 400 }}
                            placeholder="Chọn tỉnh/thành phố"
                            optionFilterProp="children"
                            onChange={onChangeSelectedCity}

                            filterOption={(input, option) =>
                              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {renderCity()}
                          </Select>
                          <div className="text-warning">{checkoutError.city}</div>
                        </Col>
                      </Row>
                    </div>

                    <div className="checkout-right-input">
                      <Row>
                        <Col span={8}>
                          <label htmlFor="address">
                            Quận/Huyện
                    <span style={{ color: 'red' }}>*</span>
                          </label>
                        </Col>
                        <Col span={16}>
                          <Select
                            className="checkout-right-input-02"
                            showSearch
                            style={{ width: 400 }}
                            placeholder="Chọn quận/huyện"
                            optionFilterProp="children"
                            onChange={onChangeSelectedDistrict}
                            filterOption={(input, option) =>
                              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            disabled={isSelected ? false : true}
                          >
                            {renderDistrictOfCity()}
                          </Select>
                          <div className="text-warning">{checkoutError.district}</div>
                        </Col>
                      </Row>
                    </div>
                    <div className="checkout-right-input">
                      <Row>
                        <Col span={8}>
                          <label htmlFor="address">
                            Xã/Phường
                    <span style={{ color: 'red' }}>*</span>
                          </label>
                        </Col>
                        <Col span={16}>
                          <Select
                            className="checkout-right-input-02"
                            showSearch
                            style={{ width: 400 }}
                            placeholder="Chọn xã/phường"
                            optionFilterProp="children"
                            onChange={onChangeSelectedWard}
                            filterOption={(input, option) =>
                              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            disabled={isSelected ? false : true}
                          >
                            {renderWardOfDistrict()}
                          </Select>
                          <div className="text-warning">{checkoutError.ward}</div>
                        </Col>
                      </Row>
                    </div>
                    <div className="checkout-right-input">
                      <Row>
                        <Col span={8}>
                          <label htmlFor="address">
                            Địa chỉ
                    <span style={{ color: 'red' }}>*</span>
                          </label>
                        </Col>
                        <Col span={16}>
                          <input className="checkout-right-input-01" type="text" placeholder="Địa chỉ" name="address" onChange={(e) => handleChange(e)} />
                          <div className="text-warning">{checkoutError.address}</div>
                        </Col>
                      </Row>
                    </div>
                    <div className="checkout_cart-grand-total-area">
                      <div className="finalCheckout">
                        <div className="emptyPrice">
                          <div>Tạm tính : {grandTotal.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} </div>
                          <div></div>
                        </div>
                        <div style={{ display: 'flex', marginBottom: '10px' }}>
                          <div>Phí vận chuyển : </div>
                          <div>Miễn phí</div>
                        </div>
                        <hr />
                        <div >
                          <h4 className="totalPrice">Thành tiền:
                    <div style={{ color: 'red', marginLeft: '30px' }}> {grandTotal.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</div></h4>
                          <div className="finalPrice"></div>
                        </div>
                        <div>
                          <button className="btn-order" onClick={() => handleCheckout()}>ĐẶT HÀNG</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>

    </>
  )
}
const mapStateToProps = (state) => {
  const { cartList } = state.cartReducer;
  const { orderList } = state.orderReducer;
  const { address, city, district, ward } = state.addressReducer;
  return {
    cartList,
    orderList,
    address,
    city,
    district,
    ward,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductList: (params) => dispatch(getProductListAction(params)),
    getOrderList: (params) => dispatch(getOrderListAction(params)),
    getCity: (params) => dispatch(getCityAction(params)),
    getDistrict: (params) => dispatch(getDistrictAction(params)),
    getWard: (params) => dispatch(getWardAction(params)),

    addToOrder: (params) => dispatch(addToOrderAction(params)),
    addAddress: (params) => dispatch(addAddressAction(params)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CheckOutPage);
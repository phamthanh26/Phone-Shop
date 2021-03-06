import Slider from "react-slick";
import React, { useEffect, useState, createElement } from 'react';
import moment from 'moment';

import { Card, Rate, Radio, Modal, Row, Col, Button, Image, Progress, notification, Input, Comment, Tooltip, Avatar } from 'antd';
import { connect } from 'react-redux';
import history from '../../../utils/history';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import { v4 } from 'uuid';

import ItemProduct from './ProductItem'
import './style.css'

import {
  getProductDetailAction,
  addToCartAction,
  getProductListAction,
  addToCommentAction,
  getCommentListAction,
  getCommentAction
} from '../../../redux/actions';

const { TextArea } = Input;
const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  height: '600px',
  textAlign: 'center',
  background: '#364d79',
};

function ProductDetailPage({
  productDetail,
  getProductDetail,
  match,
  cartList,
  addToCart,
  productList,
  getProductList,
  getComment,
  allCommentList,
  addToComment,
  getCommentList,
  commentList
}) {
  console.log("bbbbbb", productList.data)

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const productId = match.params.id;
  console.log("abc", productId)
  const [visible, setVisible] = useState(false);
  const [optionSelected, setOptionSelected] = useState({});
  const [optionSelectedGb, setOptionSelectedGb] = useState({});
  const [rate, setRate] = useState(null);
  const [comment, setComment] = useState(null);


  const onChangeComment = e => {
    setComment(e.target.value);
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  //
  useEffect(() => {
    getComment();
    getProductDetail({ id: productId });
    getProductList({
      page: 1,
      limit: 500,
    });
    getCommentList({
      productId: productId
    })
  }, [productId])

  useEffect(() => {
    if (productDetail.data.id) {
      setOptionSelected(productDetail.data.productOptions[0] || {})
      setOptionSelectedGb(productDetail.data.productCapacity[0] || {})
    }
  }, [productDetail.data])
  //??a??nh gia??
  function handleAddToComment() {
    if (rate && comment) {
      moment.locale('vi');
      const newComment = {
        userId: userInfo.id,
        productId: productId,
        name: userInfo.name,
        date: moment().format('MMMM Do YYYY'),
        time: moment().format('LT'),
        rate: rate,
        comment: comment,
      }
      addToComment({
        comment: newComment
      })
      setVisible(false)
      return notification.success({
        message: 'Ca??m ??n ba??n ??a?? ??a??nh gia??!',
      });
    } else {
      setVisible(true)
      const key = `open${Date.now()}`;
      return notification.warning({
        message: 'Ba??n c????n nh????p ??????y ??u?? th??ng tin',
      });
    }
  }
  //
  function handleAddToComment1() {
    const key = `open${Date.now()}`;
      return notification.warning({
        message: 'Ch??a ????ng nh???p',
        description: 'B???n c???n ????ng nh???p ????? ??a??nh gia??!',
        key,
        btn: (
          <Button
            type="primary"
            onClick={() => {
              notification.close(key);
              history.push('/login');
            }}
          >
            ????ng nh???p
          </Button>
        ),
      });
  }
  // khai ba??o ??i????m sao
  const Ratel = [
    'R???t t????',
    'T???',
    'B??nh th?????ng',
    'T????t',
    'R????t T????t'
  ];
  //render ??a??nh gia?? 
  function renderCommetList() {
    if (commentList.load) return <p>Loading...</p>;
    return commentList.data.map((commentItem) => {
      return (
        <div>
          <Comment
            style={{ color: "black" }}
            actions={actions}
            author={<a>{commentItem.name}</a>}
            avatar={
              <Avatar
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmNJ28YxD_E1G-yoGTppSvsY6cz3nTxp6kKQ&usqp=CAU"
                alt={commentItem.name}
              />
            }
            content={
              <div>
                <p style={{ fontSize: '17px' }}>
                  {commentItem.comment}
                </p>
                <p>
                  <Rate
                    tooltips={Ratel}
                    value={commentItem.rate}
                    disabled
                    className="rate"
                  />
                  {<span className="detail-ant-rate-text">{Ratel[commentItem.rate - 1]}</span>}
                </p>
              </div>
            }
            datetime={
              <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                <span>{commentItem.time} - {commentItem.date}</span>
              </Tooltip>
            }
          />
        </div>
      )
    })
  }


  //render product  sa??n ph????m li??n quan
  function renderProductList() {
    if (productList.load) return <p>Loading...</p>;

    return productList.data.map((productItem) => {
      if (productDetail.data.categoryId === productItem.categoryId  &&
        productItem.id != productId  ) {
      console.log("aass ", productDetail.data.categoryId )
      console.log("sdp  ", productItem.categoryId )

        let totalRate = 0;
        let count = 0;
        allCommentList.data.forEach((item) => {
          if (productItem.id == item.productId) {
            totalRate = totalRate + item.rate
            count += 1;
          }
        })
        return (
          <ItemProduct
            priceSale={productItem.priceSale}
            name={productItem.name}
            price={productItem.price}
            img={productItem.img}
            id={productItem.id}
            unit={productItem.unit}
            rate={count !== 0 ? Math.ceil(totalRate / count) : 0}
            count={count}
          />
        )
      }
    })
  }


  //render cho??n ma??u
  function showColor(colorList) {
    return {
      backgroundColor: colorList
    }
  }
  function renderProductOptions() {
    return productDetail.data.productOptions.map((item) => {
      return (

        <Radio.Button value={item}
          style={showColor(item.color)}
          className="color"
        >
        </Radio.Button>
      )
    })
  }
  //render h??nh ???nh
  function renderImg() {
    return (productDetail.data.images || []).map((imgDetailItem, imgDetailIndex) => {
      return (
        <div>
          <img className="imgdetails" src={imgDetailItem} key={`imgDetailItem -${imgDetailIndex}`} />
        </div>
      )
    })
  }
  // render dung l?????ng
  function renderProductOptionsGb() {
    return productDetail.data.productCapacity.map((item) => {
      return (
        <Radio.Button value={item} className="detail-radio">
          <div className="detail-radio-text">
            <p style={{ height: '10px' }}> {item.Capacity}</p>
            <h3 style={{ color: 'red', fontSize: '13px' }}>  {(item.price).toLocaleString()}??</h3>
          </div>
        </Radio.Button>
      )
    })
  }
  //  D??ng v???i ki???u c???n ????ng nh???p ????? b??? v??o gi??? h??ng
  function handleAddToCart() {
    if (!userInfo) {
      const key = `open${Date.now()}`;
      return notification.warning({
        message: 'Ch??a ????ng nh???p',
        description: 'B???n c???n ????ng nh???p ????? th??m v??o gi??? h??ng',
        key,
        btn: (
          <Button
            type="primary"
            onClick={() => {
              notification.close(key);
              history.push('/login');
            }}
          >
            ????ng nh???p
          </Button>
        ),
      });
    }

    if (optionSelected.id && optionSelectedGb.id) {
      const existOptionIndex = cartList.data.findIndex((item) => item.option.idColor === optionSelected.id && item.option.idGb === optionSelectedGb.id);
      if (existOptionIndex !== -1) {
        const key = `open${Date.now()}`;
        return notification.warning({
          message: 'Sa??n ph????m ??a?? co?? trong gio?? ha??ng ',
          key,
          btn: (
            <Button
              type="primary"
              onClick={() => {
                notification.close(key);
                history.push('/carts');
              }}
            >
              xem Gi??? H??ng
            </Button>
          ),
        });
      } else {
        addToCart({
          userId: userInfo.id,
          carts: [
            ...cartList.data,
            {
              id: v4(),
              productId: parseInt(productId),
              count: 1,
              name: productDetail.data.name,
              price: productDetail.data.price,
              img: productDetail.data.img,
              option: {
                idColor: optionSelected.id,
                idGb: optionSelectedGb.id,
                title: optionSelected.title,
                price: optionSelectedGb.price,
                Capacity: optionSelectedGb.Capacity,
              }
            }
          ]
        })
        const key = `open${Date.now()}`;
        return notification.success({
          message: 'th??m sa??n ph????m tha??nh c??ng  ',
          key,
          btn: (
            <Button
              type="primary"
              onClick={() => {
                notification.close(key);
                history.push('/carts');
              }}
            >
              xem Gi??? H??ng
            </Button>
          ),
        });

      }
    } else {
      const existProductIndex = cartList.data.findIndex((item) => item.productId === parseInt(productId));
      if (existProductIndex !== -1) {
        const key = `open${Date.now()}`;
        return notification.warning({
          message: 'Sa??n ph????m ??a?? co?? trong gio?? ha??ng ',
          key,
          btn: (
            <Button
              type="primary"
              onClick={() => {
                notification.close(key);
                history.push('/carts');
              }}
            >
              xem Gi??? H??ng
            </Button>
          ),
        });
      } else {
        addToCart({
          userId: userInfo.id,
          carts: [
            ...cartList.data,
            {
              id: v4(),
              productId: parseInt(productId),
              count: 1,
              name: productDetail.data.name,
              price: productDetail.data.price,
              img: productDetail.data.img,

              option: {}
            }
          ]
        })
      }
    }
  }
  // gia?? gia??m
  function showTotalOrderSale() {
    var total = 0
    total = total + (optionSelectedGb.priceSale || 0)
    return total.toLocaleString()
  }
  // render cho??n hi??nh a??nh theo ma??u
  function renderImg1() {
    return (
      <img className="detail-img-main" src={(optionSelected.img || 0)} />
    )
  }
  // gia?? t????ng
  function price() {
    var total = 0
    total = total + (optionSelectedGb.price || 0)
    return total.toLocaleString()
  }

  // @@
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction('liked');
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction('disliked');
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">Reply to</span>,
  ];

  // xem bao nhi??u l??????t ??a??nh gia??
  function ratePercent() {
    let a = 0;
    commentList.data.forEach((item) => {
      a = a + item.rate;
    })
    return Math.ceil(a / commentList.data.length)
  }
  //??k 
  function rate5() {
    let a = 0;

    commentList.data.forEach((item, index) => {
      if (item.rate === 5) {
        a = a + 1
      }
    })
    return Math.ceil((a / commentList.data.length) * 100)
  }
  function rate4() {
    let a = 0;

    commentList.data.forEach((item, index) => {
      if (item.rate === 4) {
        a = a + 1
      }
    })
    return Math.ceil((a / commentList.data.length) * 100)
  }
  function rate3() {
    let a = 0;

    commentList.data.forEach((item, index) => {
      if (item.rate === 3) {
        a = a + 1
      }
    })
    return Math.ceil((a / commentList.data.length) * 100)
  }
  function rate2() {
    let a = 0;

    commentList.data.forEach((item, index) => {
      if (item.rate === 2) {
        a = a + 1
      }
    })
    return Math.ceil((a / commentList.data.length) * 100)
  }
  function rate1() {
    let a = 0;

    commentList.data.forEach((item, index) => {
      if (item.rate === 1) {
        a = a + 1
      }
    })
    return Math.ceil((a / commentList.data.length) * 100)
  }



  return (
    <div className='detail-main'>
      <div className="detail-top-name-01">
        <h3 className="detail-top-name" >{productDetail.data.name}</h3>
        <div className="detail-rate-name-main">
          <Rate allowHalf
            value={ratePercent()} className="detail-top-rate" />
          <p className="detail-top-rate-name">
            {commentList.data.length} ??a??nh gia??
          </p>
        </div>
      </div>
      <Row gutter={16} style={{ padding: '0 16px' }}>
        <Col xl={13} xs={24}>
          <div style={{ marginTop: '20px' }}>
            {renderImg1()}
          </div>
          <div className="detail-feature">
            <h3 style={{ textAlign: 'left', marginTop: '20px' }}>T??NH N??NG N???I B???T</h3>
            <div className="detail-img-02">
              <table>
                <tr>
                  <th>K??ch Th?????c M??n H??nh</th>
                  <th>Lo???i m??n h??nh</th>
                  <th>????? ph??n gi???i</th>
                  <th>Chipset</th>
                  <th>Chip ????? ho???</th>
                </tr>
                <tr>
                  <td>6.44 inch</td>
                  <td>AMOLED</td>
                  <td>FullHD 1080p@60fps, 4K 2160p@60fps</td>
                  <td>Snapdragon 730G</td>
                  <td>Adreno 618</td>
                </tr>
              </table>
            </div>
          </div>
        </Col>
        <Col xl={11} xs={24}>
          <div className="detail-cart0">
            <Card className="detail-cart" >
              <div style={{ display: 'flex' }}>
                <h3 className="detail-price-01" >{price()}??</h3>
                <h5 style={{ textDecoration: 'line-through', color: 'rgb(94, 91, 91)', marginTop: '14px', marginLeft: '10px' }}>Gi?? ni??m y???t : {showTotalOrderSale()}??</h5>
              </div>
              {optionSelected.title ?
                <div className="detail-right-w100">
                  <h4 className='detail-color'>Ch???n M??u S???c</h4>
                  <div className="color-main">
                    <Radio.Group
                      onChange={(e) => setOptionSelected(e.target.value)}
                      value={optionSelected}
                    >
                      {renderProductOptions()}
                    </Radio.Group>
                  </div>
                  <h4 className='detail-color'>Ch???n Dung L?????ng</h4>
                  <Radio.Group
                    onChange={(e) => setOptionSelectedGb(e.target.value)}
                    value={optionSelectedGb}
                  >
                    {renderProductOptionsGb()}
                  </Radio.Group>
                </div>
                : ""
              }
              <div className="detail-sale">
                <div style={{ width: '100%', height: '55px', backgroundColor: '#34a105', color: 'white' }}>
                  <p style={{ color: 'white', paddingLeft: '10px', paddingTop: '5px', marginBottom: '0px', fontSize: '18px' }}>KHUY???N M??I:</p>
                  <p style={{ color: 'white', paddingLeft: '10px' }}> Gi?? v?? khuy???n m??i ??p d???ng ?????t v?? nh???n h??ng t??? 4/5 - 31/5</p>
                </div>
                <div style={{ display: 'flex', paddingLeft: '10px' }}>
                  <img className="detail-icon-sale" src="https://img.icons8.com/color/48/000000/ok--v1.png" />
                  <p style={{ marginLeft: '10px', marginBottom: '0px' }}> Tr??? g??p 0% (l??m h???p ?????ng tr??n gi?? b??n l???)</p>
                </div>
                <div style={{ display: 'flex', paddingLeft: '10px' }} >
                  <img className="detail-icon-sale" src="https://img.icons8.com/color/48/000000/ok--v1.png" />
                  <p style={{ marginLeft: '10px', marginBottom: '0px' }}>T???ng Phi???u mua h??ng 600.000?? (Kh??ch mua tr??? g??p ???????c tr??? ti???n tr??? tr?????c)</p>
                </div>
                <div style={{ display: 'flex', paddingLeft: '10px' }}>
                  <img className="detail-icon-sale" src="https://img.icons8.com/color/48/000000/ok--v1.png" />
                  <p style={{ paddingLeft: '10px', marginBottom: '0px' }}>Nh???p m?? VIETTELQR gi???m 5% t???i ??a 50.000d khi thanh to??n qua Vnpay</p>
                </div>
              </div>
              {/*  */}
              <div className='detail-bottom'>
                <h4 style={{ fontSize: "17px" }}>{productDetail.data.name}</h4>
                <h4 > {(optionSelected.title || "")}</h4>
                <h4 > {(optionSelectedGb.Capacity || "")}</h4>
                <div className='detail-bottom-w1'>
                  <h3 className='gia' >

                    {price()} ??
                   </h3>
                  <Button className="button-w2" onClick={() => handleAddToCart()} >TH??M V??O GI??? H??NG</Button>
                </div>
              </div>
            </Card>
          </div>
        </Col>
      </Row>
      {/* / */}
      <h2 className="detail-product-sp">S???n ph???m t????ng t????</h2>
      <p className="detail-product-sp-01"></p>
      <div style={{ display: "flex" }}>
        <div className="detail-product-04">
          <Row gutter={[4, 10]} >
            {renderProductList()}
          </Row>
        </div>

      </div>
      {/*  */}

      {/*  */}
      <div style={{ marginTop: '20px' }}>
        <div >
          <Row>
            <Col xs={24} sm={15} md={15} lg={15}>
              <Row>
                <Col span={24}>
                  <div style={{ backgroundColor: 'white', border: ' 1px solid  rgb(208, 213, 210) ', padding: '20px' }}>

                    <h1>?????c ??i???m n???i b???t c???a  {productDetail.data.name}</h1>

                    <Slider {...settings} >
                      <div>
                        <img style={{ width: '100%', height: '355px' }} src="https://images.fpt.shop/unsafe/fit-in/665x374/filters:quality(100):fill(white)/fptshop.com.vn/Uploads/Originals/2021/5/24/637574749264376216_iphone-12-pro-max-dung-luong-128gb-thiet-ke.png" />
                      </div>
                      <div>
                        <img style={{ width: '100%', height: '355px' }} src="https://images.fpt.shop/unsafe/fit-in/665x374/filters:quality(100):fill(white)/fptshop.com.vn/Uploads/Originals/2021/5/24/637574749262657324_iphone-12-pro-max-dung-luong-128gb-man-hinh.png" />
                      </div>
                      <div>
                        <img style={{ width: '100%', height: '355px' }} src="https://images.fpt.shop/unsafe/fit-in/665x374/filters:quality(100):fill(white)/fptshop.com.vn/Uploads/Originals/2021/5/24/637574749269219842_iphone-12-pro-max-dung-luong-128gb-camera.png" />
                      </div>
                      <div>
                        <img style={{ width: '100%', height: '355px' }} src="https://images.fpt.shop/unsafe/fit-in/665x374/filters:quality(100):fill(white)/fptshop.com.vn/Uploads/Originals/2021/5/24/637574749269063741_iphone-12-pro-max-dung-luong-128gb-chong-nuoc.png" />
                      </div>
                    </Slider>
                    <h1 style={{}}>????nh gi?? chi ti???t {productDetail.data.name}</h1>
                    <p>???Tr??m cu???i??? c???a d??ng iPhone 12 ???? xu???t hi???n. iPhone 12 Pro Max l?? chi???c iPhone c?? m??n h??nh l???n nh???t t??? tr?????c ?????n nay, mang tr??n m??nh b??? vi x??? l?? m???nh nh???t, camera ?????ng c???p pro c??ng k???t n???i 5G si??u t???c, cho b???n nh???ng tr???i nghi???m tuy???t v???i ch??a t???ng c??.</p>

                    <p>Trong khi s????c hu??t ??????n t???? b???? ba iPhone 11 v????n ch??a ngu????i ??i, ha??ng Apple v????a qua ??a?? cho ra m????t "si??u ph????m" m????i nh????t 2020 mang t??n iPhone 12. V????i nh????ng n??ng c????p ??a??ng k???? cho ma??n hi??nh va?? hi????u n??ng, ????y se?? la?? smartphone thu????c ph??n khu??c cao c????p ??a??ng chu?? y?? trong n??m nay.</p>
                    <h3 style={{ textAlign: 'left' }}>Ma??n hi??nh Super Retina OLED r????ng 6.1 inch</h3>
                    <p style={{ textAlign: 'justify' }}>Apple ??a?? quy????t ??i??nh gi???? nguy??n thi????t k???? notch "tai tho??" quen thu????c cho ma??n hi??nh iPhone 12, nh??ng ph????n notch ??a?? ????????c tinh gia??n nho?? go??n la??i nh????m ta??o th??m ty?? l???? hi????n thi?? hi??nh a??nh tr??n ma??n hi??nh. V???? ki??ch th??????c, ma??n hi??nh c???a m??y ?????? ph??n gia??i 2532x 1170pixels v?? c?? k??ch th?????c 6.1 inch, nh??? h??n so v???i iPhone 12 Pro Max (6.7 inch).

??????c bi????t, Apple ??a?? thay th???? c??ng ngh???? LCD b????ng c??ng ngh???? Super Retina OLED. Cu??ng v????i ti??nh n??ng Dolby Vision va?? True-tone gi??p ??i???u ch???nh ??nh s??ng ph?? h???p theo m??i tr?????ng xung quanh. M??n h??nh n??y v???i ????? s??ng t???i ??a l??n ?????n 1200 nits nh??? ???? iPhone 12 se?? hi????n thi?? hi??nh a??nh s????c ne??t, m??????t ma?? & co?? ma??u r????c r???? h??n ca??c ??????i iPhone tr??????c. ?????c bi???t v???i ????? s??ng m??n h??nh cao c??ng ????? t????ng ph???n l???n l??n ?????n 2.000.000:1, ng?????i d??ng c?? th??? tho???i m??i s??? d???ng m??y ??? ngo??i tr???i.</p>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <div >
                    <h1 style={{ marginTop: '15px' }}>????nh gi?? & Nh???n x??t {productDetail.data.name} </h1>
                    <div className="detail-dagia">
                      <Row>
                        <Col span={7}>
                          <div className="detail-evaluate">
                            <h3 className="detail-evaluate-text">????nh Gi?? Trung B??nh</h3>
                            <h1 className="detail-evaluate-number">{(ratePercent()) > 0 ? (ratePercent()) : (0)}/5</h1>
                            <Rate
                              tooltips={Ratel}
                              value={ratePercent()}
                              disabled
                              className="rate"
                            />
                            <h5>{commentList.data.length}  ????nh gi?? & {commentList.data.length}  nh???n x??t</h5>
                          </div>
                        </Col>
                        <Col span={10} className="child">
                          <div style={{ display: 'flex' }}>5 <img style={{ height: '20px', width: "20px" }} src="https://img.icons8.com/material-sharp/24/000000/star--v1.png" />  <Progress percent={rate5()} /></div>
                          <div style={{ display: 'flex' }}>4 <img style={{ height: '20px', width: "20px" }} src="https://img.icons8.com/material-sharp/24/000000/star--v1.png" />  <Progress percent={rate4()} /></div>
                          <div style={{ display: 'flex' }}>3 <img style={{ height: '20px', width: "20px" }} src="https://img.icons8.com/material-sharp/24/000000/star--v1.png" /> <Progress percent={rate3()} /></div>
                          <div style={{ display: 'flex' }}>2 <img style={{ height: '20px', width: "20px" }} src="https://img.icons8.com/material-sharp/24/000000/star--v1.png" /> <Progress percent={rate2()} /></div>
                          <div style={{ display: 'flex' }}>1 <img style={{ height: '20px', width: "20px" }} src="https://img.icons8.com/material-sharp/24/000000/star--v1.png" /> <Progress percent={rate1()} /></div>
                        </Col>
                        <Col span={7} className="child">
                          < div style={{ textAlign: "center", fontSize: '10px' }}>
                            <h3>B???n ???? d??ng s???n ph???m n??y?</h3>
                          {userInfo ?   <Button type="primary" style={{ backgroundColor: 'red' }} onClick={() => setVisible(true)}>
                              ??a??nh gia??
                   </Button>  :  <Button type="primary" style={{ backgroundColor: 'red' }} onClick={() => handleAddToComment1(true)}>
                              ??a??nh gia??
                   </Button> }
                            {userInfo ?
                              <div className="aa">

                                <Modal
                                  title={<p>??a??nh gia?? {productDetail.data.name}</p>}
                                  centered
                                  visible={visible}
                                  onOk={() => { handleAddToComment() }}
                                  onCancel={() => setVisible(false)}
                                  destroyOnClose
                                  focusTriggerAfterClose

                                  width={1000}
                                >
                                  <TextArea
                                    className='comment-rate-user'
                                    placeholder="Y?? ki????n kha??ch ha??ng"
                                    autoSize={{ minRows: 2 }}
                                    onChange={onChangeComment}
                                  />
                                  <Rate
                                    style={{ color: 'black' }}
                                    onChange={(value) => { setRate(value) }}
                                  />

                                  {
                                    rate ?
                                      <span className="ant-rate-text">
                                        {Ratel[rate - 1]}
                                      </span>
                                      :
                                      <span className="ant-rate-text">
                                        Ch???n m???c ????? h??i l??ng
               </span>
                                  }
                                </Modal>
                              </div>
                              : ""
                            }
                          </div>
                        </Col>
                      </Row>
                    </div>
                    {/*  */}
                    {/*  */}
                    <div className='comment-rate'>

                    </div>
                    <div className='show-comment'>
                      <p className='text-content'>????NH GI?? - NH???N X??T T??? KH??CH H??NG</p>
                      {userInfo ? renderCommetList() :  renderCommetList()}

                    </div>
                  </div>
                </Col>
              </Row>

            </Col>

            <Col xs={24} sm={9} md={9} lg={9}>
              <div className="detail-gb">
                <h1 style={{ height: "50px", backgroundColor: 'rgb(208, 213, 210)', paddingTop: '10px', textAlign: 'center' }}>Th??ng s??? k??? thu???t</h1>
                <div className="detail-tt-02">
                  <table>
                    <tr>
                      <th>M??n h??nh</th>
                      <th>6.7", Super Retina XDR, AMOLED, 2778 x 1284 Pixel</th>
                    </tr>
                    <tr>
                      <td>Camera sau</td>
                      <td>12.0 MP + 12.0 MP + 12.0 MP</td>
                    </tr>
                    <tr>
                      <td>Camera Selfie</td>
                      <td>12.0 MP</td>
                    </tr>
                    <tr>
                      <td>RAM </td>
                      <td>6 GB</td>
                    </tr>
                    <tr>
                      <td>B??? nh??? trong</td>
                      <td>128 GB</td>
                    </tr>
                    <tr>
                      <td>CPU</td>
                      <td>A14 Bionic</td>
                    </tr>
                    <tr>
                      <td>GPU</td>
                      <td>Apple GPU 4 nh??n</td>
                    </tr>
                    <tr>
                      <td>Dung l?????ng pin</td>
                      <td>3687 mAh</td>
                    </tr>
                    <tr>
                      <td>Th??? sim</td>
                      <td>2, 1 eSIM, 1 Nano SIM</td>
                    </tr>
                    <tr>
                      <td>H??? ??i???u h??nh</td>
                      <td>iOS 14</td>
                    </tr>
                    <tr>
                      <td>Xu???t x???</td>
                      <td>Trung Qu???c</td>
                    </tr>
                    <tr>
                      <td>Th???i gian ra m???t</td>
                      <td>10/2020</td>
                    </tr>
                  </table>
                </div>
              </div>
              <div style={{ width: '100%-15', border: '1px solid rgb(196, 190, 190)', marginLeft: '15px', marginTop: '20px', height: '530px', padding: "15px" }}>
                <h3 style={{ height: "50px", backgroundColor: 'rgb(208, 213, 210)', paddingTop: '10px' }}>Tin t???c v??? {productDetail.data.name}</h3>
                <div style={{ height: '80px', borderBottom: '1px solid rgb(208, 213, 210)', marginBottom: '10px' }}>
                  <Row>
                    <Col span={6}>
                      <img style={{ width: '100%', height: '80px' }} src="https://cellphones.com.vn/sforum/wp-content/uploads/2021/05/Apple-350x250.png" />
                    </Col>
                    <Col span={18}>
                      <p style={{ marginLeft: '10px' }}> Samsung ???d??m h??ng??? kh??? n??ng ch???p ???nh c???a iPhone 12 Pro Max trong video qu???ng c??o m???i v??? Galaxy S21 Ultra</p>
                    </Col>
                  </Row>
                </div>
                <div style={{ height: '80px', borderBottom: '1px solid rgb(208, 213, 210)', marginBottom: '10px' }}>
                  <Row>
                    <Col span={6}>
                      <img style={{ width: '100%', height: '80px' }} src="https://cellphones.com.vn/sforum/wp-content/uploads/2021/05/Galaxy-S21-Ultra-Concept-19-350x250.jpg" />
                    </Col>
                    <Col span={18}>
                      <p style={{ marginLeft: '10px' }}> ?????t mua iPhone 12 Pro Max, ng?????i ph??? n??? l???i nh???n ???????c m???t chai s???a chua v??? t??o</p>
                    </Col>
                  </Row>
                </div>
                <div style={{ height: '80px', borderBottom: '1px solid rgb(208, 213, 210)', marginBottom: '10px' }}>
                  <Row>
                    <Col span={6}>
                      <img style={{ width: '100%', height: '80px' }} src="https://cellphones.com.vn/sforum/wp-content/uploads/2021/05/Galaxy-S21-ultra-1-1-350x250.jpg" />
                    </Col>
                    <Col span={18}>
                      <p style={{ marginLeft: '10px' }}> Tin vui: iPhone 12 ???? h??? tr??? 5G tr??n eSIM, v?? Viettel l?? nh?? m???ng ti??n phong</p>
                    </Col>
                  </Row>
                </div>
                <div style={{ height: '80px', borderBottom: '1px solid rgb(208, 213, 210)', marginBottom: '10px' }}>
                  <Row>
                    <Col span={6}>
                      <img style={{ width: '100%', height: '80px' }} src="https://cellphones.com.vn/sforum/wp-content/uploads/2021/04/galaxy-s21-iphone-12-pro-max-face-350x250.jpg" />
                    </Col>
                    <Col span={18}>
                      <p style={{ marginLeft: '10px' }}> ???Tu???n l??? Apple??? ??? FPT Shop gi???m gi?? ?????n 20% cho s???n ph???m Apple</p>
                    </Col>
                  </Row>
                </div>
                <div style={{ height: '80px', borderBottom: '1px solid rgb(208, 213, 210)', marginBottom: '10px' }}>
                  <Row>
                    <Col span={6}>
                      <img style={{ width: '100%', height: '80px' }} src="https://cellphones.com.vn/sforum/wp-content/uploads/2021/03/Eco-system-7-350x250.jpg" />
                    </Col>
                    <Col span={18}>
                      <p style={{ marginLeft: '10px' }}> Samsung ???d??m h??ng??? kh??? n??ng ch???p ???nh c???a iPhone 12 Pro Max trong video qu???ng c??o m???i v??? Galaxy S21 Ultra</p>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { productDetail } = state.productReducer;
  const { cartList } = state.cartReducer;
  const { productList } = state.productReducer;
  const { commentList } = state.commentReducer;
  const { allCommentList } = state.commentReducer;
  return {
    productDetail,
    cartList,
    productList,
    commentList,
    allCommentList
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductList: (params) => dispatch(getProductListAction(params)),
    getProductDetail: (params) => dispatch(getProductDetailAction(params)),
    addToCart: (params) => dispatch(addToCartAction(params)),
    getCommentList: (params) => dispatch(getCommentListAction(params)),
    addToComment: (params) => dispatch(addToCommentAction(params)),
    getComment: (params) => dispatch(getCommentAction(params)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailPage);

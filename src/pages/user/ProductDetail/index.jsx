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
  //đánh giá
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
        message: 'Cảm ơn bạn đã đánh giá!',
      });
    } else {
      setVisible(true)
      const key = `open${Date.now()}`;
      return notification.warning({
        message: 'Bạn cần nhập đầy đủ thông tin',
      });
    }
  }
  //
  function handleAddToComment1() {
    const key = `open${Date.now()}`;
      return notification.warning({
        message: 'Chưa đăng nhập',
        description: 'Bạn cần đăng nhập để đánh giá!',
        key,
        btn: (
          <Button
            type="primary"
            onClick={() => {
              notification.close(key);
              history.push('/login');
            }}
          >
            Đăng nhập
          </Button>
        ),
      });
  }
  // khai báo điểm sao
  const Ratel = [
    'Rất tệ',
    'Tệ',
    'Bình thường',
    'Tốt',
    'Rất Tốt'
  ];
  //render đánh giá 
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


  //render product  sản phẩm liên quan
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


  //render chọn màu
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
  //render hình ảnh
  function renderImg() {
    return (productDetail.data.images || []).map((imgDetailItem, imgDetailIndex) => {
      return (
        <div>
          <img className="imgdetails" src={imgDetailItem} key={`imgDetailItem -${imgDetailIndex}`} />
        </div>
      )
    })
  }
  // render dung lượng
  function renderProductOptionsGb() {
    return productDetail.data.productCapacity.map((item) => {
      return (
        <Radio.Button value={item} className="detail-radio">
          <div className="detail-radio-text">
            <p style={{ height: '10px' }}> {item.Capacity}</p>
            <h3 style={{ color: 'red', fontSize: '13px' }}>  {(item.price).toLocaleString()}đ</h3>
          </div>
        </Radio.Button>
      )
    })
  }
  //  Dùng với kiểu cần đăng nhập để bỏ vào giỏ hàng
  function handleAddToCart() {
    if (!userInfo) {
      const key = `open${Date.now()}`;
      return notification.warning({
        message: 'Chưa đăng nhập',
        description: 'Bạn cần đăng nhập để thêm vào giỏ hàng',
        key,
        btn: (
          <Button
            type="primary"
            onClick={() => {
              notification.close(key);
              history.push('/login');
            }}
          >
            Đăng nhập
          </Button>
        ),
      });
    }

    if (optionSelected.id && optionSelectedGb.id) {
      const existOptionIndex = cartList.data.findIndex((item) => item.option.idColor === optionSelected.id && item.option.idGb === optionSelectedGb.id);
      if (existOptionIndex !== -1) {
        const key = `open${Date.now()}`;
        return notification.warning({
          message: 'Sản phẩm đã có trong giỏ hàng ',
          key,
          btn: (
            <Button
              type="primary"
              onClick={() => {
                notification.close(key);
                history.push('/carts');
              }}
            >
              xem Giỏ Hàng
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
          message: 'thêm sản phẩm thành công  ',
          key,
          btn: (
            <Button
              type="primary"
              onClick={() => {
                notification.close(key);
                history.push('/carts');
              }}
            >
              xem Giỏ Hàng
            </Button>
          ),
        });

      }
    } else {
      const existProductIndex = cartList.data.findIndex((item) => item.productId === parseInt(productId));
      if (existProductIndex !== -1) {
        const key = `open${Date.now()}`;
        return notification.warning({
          message: 'Sản phẩm đã có trong giỏ hàng ',
          key,
          btn: (
            <Button
              type="primary"
              onClick={() => {
                notification.close(key);
                history.push('/carts');
              }}
            >
              xem Giỏ Hàng
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
  // giá giảm
  function showTotalOrderSale() {
    var total = 0
    total = total + (optionSelectedGb.priceSale || 0)
    return total.toLocaleString()
  }
  // render chọn hình ảnh theo màu
  function renderImg1() {
    return (
      <img className="detail-img-main" src={(optionSelected.img || 0)} />
    )
  }
  // giá tổng
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

  // xem bao nhiêu lượt đánh giá
  function ratePercent() {
    let a = 0;
    commentList.data.forEach((item) => {
      a = a + item.rate;
    })
    return Math.ceil(a / commentList.data.length)
  }
  //đk 
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
            {commentList.data.length} đánh giá
          </p>
        </div>
      </div>
      <Row gutter={16} style={{ padding: '0 16px' }}>
        <Col xl={13} xs={24}>
          <div style={{ marginTop: '20px' }}>
            {renderImg1()}
          </div>
          <div className="detail-feature">
            <h3 style={{ textAlign: 'left', marginTop: '20px' }}>TÍNH NĂNG NỔI BẬT</h3>
            <div className="detail-img-02">
              <table>
                <tr>
                  <th>Kích Thước Màn Hình</th>
                  <th>Loại màn hình</th>
                  <th>Độ phân giải</th>
                  <th>Chipset</th>
                  <th>Chip đồ hoạ</th>
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
                <h3 className="detail-price-01" >{price()}đ</h3>
                <h5 style={{ textDecoration: 'line-through', color: 'rgb(94, 91, 91)', marginTop: '14px', marginLeft: '10px' }}>Giá niêm yết : {showTotalOrderSale()}đ</h5>
              </div>
              {optionSelected.title ?
                <div className="detail-right-w100">
                  <h4 className='detail-color'>Chọn Màu Sắc</h4>
                  <div className="color-main">
                    <Radio.Group
                      onChange={(e) => setOptionSelected(e.target.value)}
                      value={optionSelected}
                    >
                      {renderProductOptions()}
                    </Radio.Group>
                  </div>
                  <h4 className='detail-color'>Chọn Dung Lượng</h4>
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
                  <p style={{ color: 'white', paddingLeft: '10px', paddingTop: '5px', marginBottom: '0px', fontSize: '18px' }}>KHUYẾN MÃI:</p>
                  <p style={{ color: 'white', paddingLeft: '10px' }}> Giá và khuyến mãi áp dụng đặt và nhận hàng từ 4/5 - 31/5</p>
                </div>
                <div style={{ display: 'flex', paddingLeft: '10px' }}>
                  <img className="detail-icon-sale" src="https://img.icons8.com/color/48/000000/ok--v1.png" />
                  <p style={{ marginLeft: '10px', marginBottom: '0px' }}> Trả góp 0% (làm hợp đồng trên giá bán lẻ)</p>
                </div>
                <div style={{ display: 'flex', paddingLeft: '10px' }} >
                  <img className="detail-icon-sale" src="https://img.icons8.com/color/48/000000/ok--v1.png" />
                  <p style={{ marginLeft: '10px', marginBottom: '0px' }}>Tặng Phiếu mua hàng 600.000Đ (Khách mua trả góp được trừ tiền trả trước)</p>
                </div>
                <div style={{ display: 'flex', paddingLeft: '10px' }}>
                  <img className="detail-icon-sale" src="https://img.icons8.com/color/48/000000/ok--v1.png" />
                  <p style={{ paddingLeft: '10px', marginBottom: '0px' }}>Nhập mã VIETTELQR giảm 5% tối đa 50.000d khi thanh toán qua Vnpay</p>
                </div>
              </div>
              {/*  */}
              <div className='detail-bottom'>
                <h4 style={{ fontSize: "17px" }}>{productDetail.data.name}</h4>
                <h4 > {(optionSelected.title || "")}</h4>
                <h4 > {(optionSelectedGb.Capacity || "")}</h4>
                <div className='detail-bottom-w1'>
                  <h3 className='gia' >

                    {price()} đ
                   </h3>
                  <Button className="button-w2" onClick={() => handleAddToCart()} >THÊM VÀO GIỎ HÀNG</Button>
                </div>
              </div>
            </Card>
          </div>
        </Col>
      </Row>
      {/* / */}
      <h2 className="detail-product-sp">Sản phẩm tương tự</h2>
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

                    <h1>Đặc điểm nổi bật của  {productDetail.data.name}</h1>

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
                    <h1 style={{}}>Đánh giá chi tiết {productDetail.data.name}</h1>
                    <p>“Trùm cuối” của dòng iPhone 12 đã xuất hiện. iPhone 12 Pro Max là chiếc iPhone có màn hình lớn nhất từ trước đến nay, mang trên mình bộ vi xử lý mạnh nhất, camera đẳng cấp pro cùng kết nối 5G siêu tốc, cho bạn những trải nghiệm tuyệt vời chưa từng có.</p>

                    <p>Trong khi sức hút đến từ bộ ba iPhone 11 vẫn chưa nguội đi, hãng Apple vừa qua đã cho ra mắt "siêu phẩm" mới nhất 2020 mang tên iPhone 12. Với những nâng cấp đáng kể cho màn hình và hiệu năng, đây sẽ là smartphone thuộc phân khúc cao cấp đáng chú ý trong năm nay.</p>
                    <h3 style={{ textAlign: 'left' }}>Màn hình Super Retina OLED rộng 6.1 inch</h3>
                    <p style={{ textAlign: 'justify' }}>Apple đã quyết định giữ nguyên thiết kế notch "tai thỏ" quen thuộc cho màn hình iPhone 12, nhưng phần notch đã được tinh giản nhỏ gọn lại nhằm tạo thêm tỷ lệ hiển thị hình ảnh trên màn hình. Về kích thước, màn hình của máy độ phân giải 2532x 1170pixels và có kích thước 6.1 inch, nhỏ hơn so với iPhone 12 Pro Max (6.7 inch).

Đặc biệt, Apple đã thay thế công nghệ LCD bằng công nghệ Super Retina OLED. Cùng với tính năng Dolby Vision và True-tone giúp điều chỉnh ánh sáng phù hợp theo môi trường xung quanh. Màn hình này với độ sáng tối đa lên đến 1200 nits nhờ đó iPhone 12 sẽ hiển thị hình ảnh sắc nét, mượt mà & có màu rực rỡ hơn các đời iPhone trước. Đặc biệt với độ sáng màn hình cao cùng độ tương phản lớn lên đến 2.000.000:1, người dùng có thể thoải mái sử dụng máy ở ngoài trời.</p>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <div >
                    <h1 style={{ marginTop: '15px' }}>Đánh giá & Nhận xét {productDetail.data.name} </h1>
                    <div className="detail-dagia">
                      <Row>
                        <Col span={7}>
                          <div className="detail-evaluate">
                            <h3 className="detail-evaluate-text">Đánh Giá Trung Bình</h3>
                            <h1 className="detail-evaluate-number">{(ratePercent()) > 0 ? (ratePercent()) : (0)}/5</h1>
                            <Rate
                              tooltips={Ratel}
                              value={ratePercent()}
                              disabled
                              className="rate"
                            />
                            <h5>{commentList.data.length}  đánh giá & {commentList.data.length}  nhận xét</h5>
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
                            <h3>Bạn đã dùng sản phẩm này?</h3>
                          {userInfo ?   <Button type="primary" style={{ backgroundColor: 'red' }} onClick={() => setVisible(true)}>
                              Đánh giá
                   </Button>  :  <Button type="primary" style={{ backgroundColor: 'red' }} onClick={() => handleAddToComment1(true)}>
                              Đánh giá
                   </Button> }
                            {userInfo ?
                              <div className="aa">

                                <Modal
                                  title={<p>Đánh giá {productDetail.data.name}</p>}
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
                                    placeholder="Ý kiến khách hàng"
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
                                        Chọn mức độ hài lòng
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
                      <p className='text-content'>ĐÁNH GIÁ - NHẬN XÉT TỪ KHÁCH HÀNG</p>
                      {userInfo ? renderCommetList() :  renderCommetList()}

                    </div>
                  </div>
                </Col>
              </Row>

            </Col>

            <Col xs={24} sm={9} md={9} lg={9}>
              <div className="detail-gb">
                <h1 style={{ height: "50px", backgroundColor: 'rgb(208, 213, 210)', paddingTop: '10px', textAlign: 'center' }}>Thông số kỹ thuật</h1>
                <div className="detail-tt-02">
                  <table>
                    <tr>
                      <th>Màn hình</th>
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
                      <td>Bộ nhớ trong</td>
                      <td>128 GB</td>
                    </tr>
                    <tr>
                      <td>CPU</td>
                      <td>A14 Bionic</td>
                    </tr>
                    <tr>
                      <td>GPU</td>
                      <td>Apple GPU 4 nhân</td>
                    </tr>
                    <tr>
                      <td>Dung lượng pin</td>
                      <td>3687 mAh</td>
                    </tr>
                    <tr>
                      <td>Thẻ sim</td>
                      <td>2, 1 eSIM, 1 Nano SIM</td>
                    </tr>
                    <tr>
                      <td>Hệ điều hành</td>
                      <td>iOS 14</td>
                    </tr>
                    <tr>
                      <td>Xuất xứ</td>
                      <td>Trung Quốc</td>
                    </tr>
                    <tr>
                      <td>Thời gian ra mắt</td>
                      <td>10/2020</td>
                    </tr>
                  </table>
                </div>
              </div>
              <div style={{ width: '100%-15', border: '1px solid rgb(196, 190, 190)', marginLeft: '15px', marginTop: '20px', height: '530px', padding: "15px" }}>
                <h3 style={{ height: "50px", backgroundColor: 'rgb(208, 213, 210)', paddingTop: '10px' }}>Tin tức về {productDetail.data.name}</h3>
                <div style={{ height: '80px', borderBottom: '1px solid rgb(208, 213, 210)', marginBottom: '10px' }}>
                  <Row>
                    <Col span={6}>
                      <img style={{ width: '100%', height: '80px' }} src="https://cellphones.com.vn/sforum/wp-content/uploads/2021/05/Apple-350x250.png" />
                    </Col>
                    <Col span={18}>
                      <p style={{ marginLeft: '10px' }}> Samsung “dìm hàng” khả năng chụp ảnh của iPhone 12 Pro Max trong video quảng cáo mới về Galaxy S21 Ultra</p>
                    </Col>
                  </Row>
                </div>
                <div style={{ height: '80px', borderBottom: '1px solid rgb(208, 213, 210)', marginBottom: '10px' }}>
                  <Row>
                    <Col span={6}>
                      <img style={{ width: '100%', height: '80px' }} src="https://cellphones.com.vn/sforum/wp-content/uploads/2021/05/Galaxy-S21-Ultra-Concept-19-350x250.jpg" />
                    </Col>
                    <Col span={18}>
                      <p style={{ marginLeft: '10px' }}> Đặt mua iPhone 12 Pro Max, người phụ nữ lại nhận được một chai sữa chua vị táo</p>
                    </Col>
                  </Row>
                </div>
                <div style={{ height: '80px', borderBottom: '1px solid rgb(208, 213, 210)', marginBottom: '10px' }}>
                  <Row>
                    <Col span={6}>
                      <img style={{ width: '100%', height: '80px' }} src="https://cellphones.com.vn/sforum/wp-content/uploads/2021/05/Galaxy-S21-ultra-1-1-350x250.jpg" />
                    </Col>
                    <Col span={18}>
                      <p style={{ marginLeft: '10px' }}> Tin vui: iPhone 12 đã hỗ trợ 5G trên eSIM, và Viettel là nhà mạng tiên phong</p>
                    </Col>
                  </Row>
                </div>
                <div style={{ height: '80px', borderBottom: '1px solid rgb(208, 213, 210)', marginBottom: '10px' }}>
                  <Row>
                    <Col span={6}>
                      <img style={{ width: '100%', height: '80px' }} src="https://cellphones.com.vn/sforum/wp-content/uploads/2021/04/galaxy-s21-iphone-12-pro-max-face-350x250.jpg" />
                    </Col>
                    <Col span={18}>
                      <p style={{ marginLeft: '10px' }}> ‘Tuần lễ Apple’ – FPT Shop giảm giá đến 20% cho sản phẩm Apple</p>
                    </Col>
                  </Row>
                </div>
                <div style={{ height: '80px', borderBottom: '1px solid rgb(208, 213, 210)', marginBottom: '10px' }}>
                  <Row>
                    <Col span={6}>
                      <img style={{ width: '100%', height: '80px' }} src="https://cellphones.com.vn/sforum/wp-content/uploads/2021/03/Eco-system-7-350x250.jpg" />
                    </Col>
                    <Col span={18}>
                      <p style={{ marginLeft: '10px' }}> Samsung “dìm hàng” khả năng chụp ảnh của iPhone 12 Pro Max trong video quảng cáo mới về Galaxy S21 Ultra</p>
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

import { useEffect, useState } from 'react';
import Slide from '../user/Slide'
import Slider from "react-slick";
import './styles.css';
import gsap from "gsap";
import {
  addSearchProductAction,
  getCommentAction,
} from '../../redux/actions';

import {
  Card, Tabs, List, Radio, Row, Col,
  Rate, Carousel, Button, Divider, Image, notification,
  Menu, Space, Dropdown, Input, Badge
} from 'antd';
import { connect } from 'react-redux';
import history from '../../utils/history';

import { AppleOutlined, AndroidOutlined, ShoppingCartOutlined, DownOutlined, SearchOutlined } from '@ant-design/icons';
import HomeContact from '../HomeList/HomeContact'
import HomeProduct from '../HomeList/HomeProduct'
import Gsap from '../HomeList/Gsap'
import {
  getProductDetailAction,
  addToCartAction,
  getProductListAction
} from '../../redux/actions';

gsap.from(".box", {
  duration: 2,
  scale: 0.5,
  opacity: 0,
  delay: 0.5,
  stagger: 0.2,
  ease: "elastic",
  force3D: true
});

document.querySelectorAll(".box").forEach(function (box) {
  box.addEventListener("click", function () {
    gsap.to(".box", {
      duration: 0.5,
      opacity: 0,
      y: -100,
      stagger: 0.1,
      ease: "back.in"
    });
  });
});
const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  speed: 27000,
  autoplaySpeed: 1000,
  cssEase: "linear"
};

const { TabPane } = Tabs;
const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;
function HomePage({ productDetail,
  addSearchProduct,
  getProductDetail,
  match,
  cartList,
  addToCart,
  productList,
  getProductList,
  getComment,
  allCommentList, }) {
  const productId = match.params.id;
  const [searchValue, setSearchValue] = useState();

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      addSearchProduct({ searchValue });
      history.push('/search');
      setSearchValue('')
    }
  }
  useEffect(() => {

    getComment();
    getProductList({
      page: 1,
      limit: 4,
    });
  }, [])
  function handleFilterCategory(id) {

    getProductList({
      page: 1,
      limit: 8,
      categoryId: id,
    });
  }

  //render product 
  function renderProductList() {
    if (productList.load) return <p>Loading...</p>;
    return productList.data.map((productItem, index) => {
      let totalRate = 0;
      let count = 0;
      allCommentList.data.forEach((item) => {
        if (productItem.id == item.productId) {
          totalRate = totalRate + item.rate
          count += 1;
        }
      })
      return (
        <Col xs={24} sm={12} md={12} lg={6}>
          <Card
            style={{ border: '1px solid rgb(236, 228, 228) ', margin: '10px' }}
            onClick={() => history.push(`/product/${productItem.id}`)}
            bordered={false}
            hoverable
            size="small"
          >
            <Row>
              <Col span={24}>
                <p className='sale'>Trả góp 0%</p>
              </Col>
              <Col span={24}>
                <img style={{ height: '250px', width: '240px' }} onClick={() => history.push(`/product/${productItem.id}`)} src={productItem.img} />
                <h4 style={{ fontSize: '17px' }}>{productItem.name} </h4>
                <Row>
                  <Col span={12}>
                    <h4 style={{ color: 'red', textAlign: 'left', fontSize: '15px' }}>{(productItem.price).toLocaleString()}₫ </h4>
                  </Col>
                  <Col span={12}>
                    <h4 style={{ textAlign: 'right', fontSize: '12px', textDecoration: 'line-through' }}>{(productItem.priceSale).toLocaleString()}₫</h4>
                  </Col>
                </Row>
              </Col>
            </Row>
            {/* </div> */}
            <Row>
              <Col span={12}>
                <div className="product-rate">
                  <Rate disabled value={count !== 0 ? Math.ceil(totalRate / count) : 0} className="aaa" />
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
    })
  }
  gsap.to('.ball', {
    duration: 1.5,
    delay: 0.5,
    x: 100,
    scale: 2,
    borderRadius: 50,
    background: "#457B9D",
    borderColor: "#a8dadc"
  });
  return (
    <div className="home">

      <Slide />

      <div style={{ marginLeft: '50px', marginRight: '50px', marginBottom: '30px' }}>

        <h2 style={{ textAlign: 'center', fontSize: '40px', marginTop: '20px', color: 'black' }}>Sản Phẩm Nổi Bật</h2>
        <div >
        </div>
        <div>
          <Row gutter={[4, 10]} >
            {renderProductList()}
          </Row>
        </div>
        <div >
        </div>
      </div>
      <div>
      </div>
      <div>
      </div>

      <div className="home-video-main">
        <Row>
          <Col span={12}>
            <video autoPlay loop auto muted
              style={{ width: '100%', marginBottom: '20px', zIndex: '2' }}
              type="video/mp4"
              src="https://www.apple.com/105/media/us/iphone-12-pro/2020/e70ffbd8-50f1-40f3-ac36-0f03a15ac314/anim/colors/large.mp4"
            />
          </Col>
          <Col style={{ backgroundColor: 'black', width: '100%', height: '700px' }} span={12}>
            <div style={{ color: 'white', textAlign: 'center', marginTop: '250px', fontSize: "35px" }}>
              <h3 style={{ color: 'white', textAlign: 'center' }}> iPhone 12 Pro Max </h3>
              <p>  6.7” Super Retina
          XDR display2</p>
              <button
                style={{ color: 'white', backgroundColor: 'black', border: '1px solid #9eab7b', fontSize: '25px', height: '50px', width: "200px" }}
                onClick={() => history.push(`/product/29`)}
              >MUA NGAY</button>
            </div>
          </Col>
        </Row>
      </div>
      <div className="home-row-main">
        <h1 style={{ textAlign: 'center', margin: '60px', fontSize: '35px' }}>Khuyến mãi & sự kiện</h1>
        <Row>
          <Col span={8}>
            <div className="home-row">
              <img style={{ width: '100%' }} src="https://images.samsung.com/is/image/samsung/assets/vn/p6_gro3/p6_my_samsung/FT12_Card1_HW_MO.png?$FB_TYPE_J_S_PNG$" />
              <h1 style={{ marginTop: "15px" }} > Thứ 4 & Thử 5 hàng tuần</h1>
              <h3>Rước siêu deal Rinh siêu phẩm</h3>
              <p style={{ margin: "20px" }}> Sở hữu ngay siêu phẩm Samsung với ưu đãi đến 50% mỗi thứ 4 & thứ 5 hàng tuần. Cùng nhiều ưu đãi hấp dẫn khác</p>
            </div>
          </Col>
          <Col span={8} >
            <div className="home-row">
              <img style={{ width: '100%', height: '240px' }} src="https://didongviet.vn/blog/wp-content/uploads/2021/01/rog-phone-4-cover-didongviet.jpg" />
              <h1 style={{ marginTop: "15px" }}>30.07.21 - 31.12.21</h1>
              <h3>Độc quyền sinh viên Trọn năm ưu đãi</h3>
              <p style={{ margin: "20px" }}>Đừng bỏ lỡ cơ hội ưu đãi đến 30% độc quyền dành riêng cho sinh viên. Đăng ký một lần nhận ưu đãi cả năm!</p>
            </div>
          </Col>
          <Col span={8} >
            <div className="home-row">
              <img style={{ width: '100%' }} src="https://images.samsung.com/is/image/samsung/assets/vn/p6_gro3/p6_my_samsung/FT12_Card2_Student_MO.png?$FB_TYPE_J_S_PNG$" />
              <h1 style={{ marginTop: "15px" }}>Diễn ra đến 31.12.21</h1>
              <h3>Lên đời siêu phẩm</h3>
              <p style={{ margin: "20px" }}>Dễ dàng lên đời siêu phẩm tiết kiệm đến 17,000,000. Áp dụng đồng thời ưu đãi trả góp 0%</p>
            </div>
          </Col>
        </Row>
      </div>
      <HomeContact />
      <div className="home-botton">
        <h1 style={{ textAlign: 'center', fontSize: '40px', marginTop: '250px' }}>Chúng tôi có thể giúp bạn tìm kiếm?</h1>
        <div className="home-search">

          <div className="home-search-0">
            <input
              className="home-s"
              onChange={(e) => { setSearchValue(e.target.value) }}
              value={searchValue}
              onKeyDown={handleKeyDown}
              style={{ height: '35px' }}
            />
            {
              searchValue ?
                <button
                  className="home-search-02"
                  onClick={() => {
                    addSearchProduct({ searchValue });
                    history.push('/search');
                    setSearchValue('')
                  }}
                >
                  <img src="https://img.icons8.com/fluent-systems-regular/48/000000/search--v1.png" />
                </button> :
                <button
                  className="home-search-02"
                >
                  <img src="https://img.icons8.com/fluent-systems-regular/48/000000/search--v1.png" />
                </button>
            }
          </div>
        </div>
      </div>
    </div>
  );
}


const mapStateToProps = (state) => {
  const { allCommentList } = state.commentReducer;
  const { productList } = state.productReducer;
  return {

    productList,
    allCommentList
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductList: (params) => dispatch(getProductListAction(params)),
    addSearchProduct: (params) => dispatch(addSearchProductAction(params)),
    getComment: (params) => dispatch(getCommentAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

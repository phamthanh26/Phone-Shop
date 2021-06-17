import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col, List, Collapse, Button, Image } from 'antd';
import Slider from "react-slick";

import './style.css'
import ItemProduct from './item'

import {
  getProductListAction,
  getCommentAction,
  getCategoryListAction,
} from '../../../redux/actions';

function ProductListPage({
  getCategoryList, // truyền tt hãng
  getProductList, // truyền tt sản phẩm
  getComment, // truyền tt đánh giá
  categoryList, // lấy ds hãng
  productList, // lấy ds sản phẩm
  allCommentList, // lấy ds đánh giá
}) {
  const [page, setPage] = useState(1)
  const { Panel } = Collapse;
  const [categorySelected, setCategorySelected] = useState(null);

  // khai báo react-slick
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  //
  useEffect(() => {
    getCategoryList();
    getComment();
    getProductList({
      page: 1,
      limit: 8,
    });

  }, []);
  // render sp
  function handleFilterCategory(id) {
    setCategorySelected(id);
    getProductList({
      page: 1,
      limit: 8,
      categoryId: id,
    });
  }
  // render san pham
  function renderProductList() {
    if (productList.load) return <p>Loading...</p>;
    return productList.data.map((productItem) => {
      let totalRate = 0;
      let count = 0;
      allCommentList.data.forEach((item) => {
        if (productItem.id == item.productId) {
          totalRate = totalRate + item.rate
          count = count + 1;
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
    })
  }


  // render hãng
  function renderCategories() {
    return (
      < List
        className="product-list"
        header={false}
        dataSource={[
          ...categoryList.data,
        ]}
        renderItem={(item, index) => (
          <List.Item
            className='phone-product'
            onClick={() => handleFilterCategory(item.id)}
            style={{ color: categorySelected === item.id ? 'red' : 'black' }}
          >
            <Image preview={false} src={item.img} style={{ width: '98px', borderRadius: '20px' }} />
          </List.Item>
        )}
      />
    )

  }
  // load more
  function handleShowMore() {
    // setPage(page + 1);
    getProductList({
      more: true,
      // page: page + 1,
      page: page + 1,
      limit: 8,
      categoryId: categorySelected,
    });
    setPage(page + 1);
  }


  return (
    <div className='product'>
      <Row>
        <Col span={24}>
          <div>
            <Slider {...settings} >
              <div>
                <img style={{ width: '100%', height: '355px' }} src="https://cdn01.dienmaycholon.vn/filewebdmclnew/public//picture/slideshow/slide_cate_1620289668.jpg" />
              </div>
              <div>
                <img style={{ width: '100%', height: '355px' }} src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/iPad_Pro_11_Sliding_desk.png  " />
              </div>
              <div>
                <img style={{ width: '100%', height: '355px' }} src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/690-300-max.png" />
              </div>
            </Slider>
          </div>
        </Col>
        <Col span={24}>
          <Row>
            <Col span={6} style={{}}>
              <img src="https://hoanghamobile.com/Uploads/2021/06/01/group-3488.png" />
            </Col>
            <Col span={6} style={{}}>
              <img src="https://hoanghamobile.com/Uploads/2021/06/03/san-pham-hot-linh-linh.png" />
            </Col>
            <Col span={6} style={{}}>
              <img src="https://hoanghamobile.com/Uploads/2021/06/11/san-pham-hot-a322.png" />
            </Col>
            <Col span={6} style={{}}>
              <img src="https://hoanghamobile.com/Uploads/2021/06/01/iphone-12-sdkb.png" />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={24} style={{ padding: '0 16px' }}>
        <Col span={24} style={{ alignItems: 'center', marginLeft: '10px' }}>
        </Col>
        <Row gutter={[4, 10]} >
          {renderCategories()}
        </Row>
        <Col span={24}>
          <Row gutter={[4, 10]} >
            {renderProductList()}
          </Row>
          {productList.data.length % 4 === 0 && (
            <Row justify="center">
              <Button onClick={() => handleShowMore()} className="show-more"
              >{productList.load ? 'Đang tải...' : 'Xem thêm'}</Button>
            </Row>
          )}
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { categoryList, productList } = state.productReducer;
  const { allCommentList } = state.commentReducer;
  return {
    categoryList,
    productList,
    allCommentList
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductList: (params) => dispatch(getProductListAction(params)),
    getCategoryList: (params) => dispatch(getCategoryListAction(params)),
    getComment: (params) => dispatch(getCommentAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);

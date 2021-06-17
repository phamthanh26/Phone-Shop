import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { Row, Col, Card, Rate } from 'antd';
import history from '../../utils/history';
import { getProductListAction ,getCommentAction, } from '../../redux/actions';

import './styles.css'
function SearchPage({
  getProductList,
  productList,
  searchValue,
  getComment,
  allCommentList
}) {

  useEffect(() => {
    getComment();
    getProductList({
      searchValue: searchValue[0].searchValue ? searchValue[0].searchValue : ''
    });
  }, [searchValue[0].searchValue]);

  function renderProductList() {
    if (productList.load) return <p>Loading...</p>;
    return productList.data.map((productItem, productIndex) => {
        let totalRate = 0;
        let count = 0;
        allCommentList.data.forEach((item) => {
          if (productItem.id == item.productId) {
            totalRate = totalRate + item.rate
            count = count + 1;
          }
        })
      return (
        <Col span={6}>
          <Card
            style={{ border: '1px solid rgb(214, 214, 214) ' }}
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
            <Row>
              <Col span={12}>
              <div className="product-rate">
                <Rate allowHalf value={count !== 0 ? Math.ceil(totalRate / count) : 0} className="aaa" />
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

  return (
    <div style={{ backgroundColor: 'white' }}>
      <div style={{
        maxWidth: '1170px',
        marginLeft: '90px',
        minHeight: '90vh',
        backgroundColor: 'white',

      }}
      >
        <div className="search-text">
          <h3 style={{ color: 'red', textAlign: 'left' }}> Trang chủ </h3>
          <h3> / </h3>
          <h3> Kết quả tìm kiếm cho '{searchValue[0].searchValue}'</h3>
        </div>
        <h1 style={{ textAlign: 'left', fontSize: '26px', borderBottom: '1px solid rgb(226, 221, 213)' }}> Tìm thấy {productList.data.length} kết quả phù hợp với từ khóa '{searchValue[0].searchValue}'</h1>
        <Row gutter={[16, 16]}>
          {renderProductList()}
        </Row>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { productList, searchValue } = state.productReducer;
  const { allCommentList } = state.commentReducer;
  return {
    productList,
    searchValue,
    allCommentList
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getComment: (params) => dispatch(getCommentAction(params)),
    getProductList: (params) => dispatch(getProductListAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
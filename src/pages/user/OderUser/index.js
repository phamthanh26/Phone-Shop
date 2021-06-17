import { connect } from 'react-redux';
import * as Style from './styles';
import history from '../../../utils/history';
import React, { useEffect, useState } from 'react';
import {
  Form,
  Row,
  Col,
  Menu,
  Table,
  List,
  Input, Button, Space, Tag, Typography, Card, Modal, Tabs
} from 'antd';
import {
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
} from '@ant-design/icons';
import {
  getUserInfoAction,
  getOrderListAction,
  reviewOrderListAction,
  getOrderItemAction
} from '../../../redux/actions';

const { SubMenu } = Menu;
function OderUser({
  getOrderItem,
  orderItem }) {
  const { TabPane } = Tabs;
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    getOrderItem({ userId: userInfo.id })
  }, []);

  const [userForm] = Form.useForm();
  const [repassForm] = Form.useForm();
  const tableData = orderItem.data.map((item) => {
    return {
      key: item.id,
      id: item.id,
      userName: item.userName,
      status: item.status,
      address: item.address,
      carts: item.carts,
      time: `${item.time} - ${item.date}`,
      totalPrice: item.totalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
    }
  })

  const tableColumns = [
    {
      title: 'Tên người nhận',
      dataIndex: 'userName',
      key: 'userName',
    },
    {

      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => {
        if (record.status == 'waiting') {
          return (
            <div>Đang chờ xác nhận</div>
          )
        } else if (record.status == 'confirmed') {
          return (
            <div>Đã xác nhận</div>
          )
        } else {
          return (
            <div>Đã hủy</div>
          )
        }
      }
    },
  ];
  //    
  const [collapsed, setCollapsed] = useState(false);
  function toggleCollapsed() {
    setCollapsed({
      collapsed: true,
    });
  };
  return (
    <div className="profile-main">
      <Row>
        <Col span={7} >
          <div className="profile-menu">

            <div style={{ width: 256 }}>
              <h1 style={{ height: '60px', borderBottom: '1px solid rgb(208, 213, 210)', paddingTop: '5px' }}>{userInfo ? userInfo.name : " "}</h1>
              <Menu
                defaultSelectedKeys={['2']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme=""

              >
                <Menu.Item key="1" icon={<PieChartOutlined />} onClick={() => history.push('./profile')}>
                  Thông tin tài khoản
          </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined />} onClick={() => history.push('./orderUser')}>
                  Quản lý đơn hàng
          </Menu.Item>
                <Menu.Item key="3" icon={<ContainerOutlined />} onClick={() => history.push('./editPassword')}>
                  Đổi mật khẩu
          </Menu.Item>

              </Menu>
            </div>
          </div>
        </Col>
        <Col span={17} className="profile-user">
          <h1 style={{ height: '60px', borderBottom: '1px solid rgb(208, 213, 210)' }}>LỊCH SỬ MUA HÀNG</h1>
          {
            orderItem.data.length > 0 ?
              <div>   
                    <Table
                      loading={orderItem.load}
                      size="middle"
                      columns={tableColumns}
                      dataSource={tableData}
                      expandable={{
                        expandedRowRender: (record) => {
                          return (
                            <Row>
                              <Col span={24} >
                                <List
                                  size="small"
                                  dataSource={record.carts}
                                  renderItem={(item) => (
                                    <List.Item>
                                      <Row justify="space-between" style={{ width: '100%' }}>
                                        
                                        <div>{item.name}</div>
                                        <div style={{ margin: ' 0px 5px 0px 5px' }}>/ Số lượng : {item.count} /</div>
                                        <div>Giá: {(item.price * item.count).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</div>
                                      </Row>
                                    </List.Item>
                                  )}
                                />
                              </Col>
                            </Row>
                          )
                        }
                      }}
                    />
              </div>
              : <h1 style={{ textAlign: 'center', marginTop: '70px' }}>Đơn hàng của bạn trống!</h1>
          }

        </Col>
      </Row>
    </div>
  );
}
const mapStateToProps = (state) => {
  const { orderItem } = state.orderReducer;

  return {
    orderItem
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    getOrderItem: (params) => dispatch(getOrderItemAction(params)),
    getUserInfo: (params) => dispatch(getUserInfoAction(params)),
    getOrderList: (params) => dispatch(getOrderListAction(params)),
    reviewOrderList: (params) => dispatch(reviewOrderListAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OderUser);

import './style.css';
import { connect } from 'react-redux';
import history from '../../../utils/history';
import React, { useEffect, useState, createElement } from 'react';
import {
  Form,
  Input,
  Row,
  Col,
  Menu,
  Space,
  notification,
} from 'antd';
import 'moment/locale/vi';
import {
  getUserInfoAction,
  updatePasswordAction,
} from '../../../redux/actions';
import {
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;
function Profile({
  updatePassword,
}) {

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [repassForm] = Form.useForm();

  function showNotiChange() {
    return notification.success({
      message: 'Thay đổi mật khẩu thành công!',
    });
  }
  //
  return (
    <div className="profile-main">
      <Row>
        <Col span={7} >
          <div className="profile-menu">

            <div style={{ width: 256 }}>
              <h1 style={{ height: '60px', borderBottom: '1px solid rgb(208, 213, 210)', paddingTop: '5px' }}>{userInfo ? userInfo.name : ""}</h1>
              <Menu
                defaultSelectedKeys={['3']}
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
                <Menu.Item key="3" icon={<ContainerOutlined />} onClick={() => history.push('./editPassword')} >
                  Đổi mật khẩu
          </Menu.Item>
              </Menu>
            </div>
          </div>
        </Col>
        <Col span={17} className="profile-user">
          <h1 style={{ height: '60px', borderBottom: '1px solid rgb(208, 213, 210)' }}>THAY ĐỔI MẬT KHẨU</h1>
          {
            userInfo ?
              <Row>
                <Col span={8}>
                  <img style={{ width: '90%', paddingTop: '10px' }} src="https://www.computerhope.com/jargon/g/guest-user.jpg" />
                </Col>
                <Col span={16} >
                  <div className="profile-user-02">
                    <div style={{ width: '100%', backgroundColor: "white" }}>
                      <Form
                        form={repassForm}
                        layout="vertical"
                        name="productForm"
                        onFinish={(values) => {
                          if (values.password !== userInfo.password) {
                            const key = `open${Date.now()}`;
                            return notification.warning({
                              message: 'Bạn nhập mật khẩu cũ sai',
                              key,
                            });
                          } else if (values.new_pw !== values.renew_pw) {
                            const key = `open${Date.now()}`;
                            return notification.warning({
                              message: 'Mật khẩu không trùng nhau',
                              key,
                            });
                          } else {
                            const pass = {
                              id: userInfo.id,
                              password: values.new_pw,
                            }
                            updatePassword({
                              pass: pass
                            })
                            showNotiChange()
                          }
                        }}
                      >
                        <Form.Item
                          label="Mật khẩu cũ"
                          name="password"
                          rules={[{ required: true, message: 'Bạn cần nhập mật khẩu cũ' }]}
                        >
                          <Input.Password />
                        </Form.Item>
                        <Form.Item
                          label="Mật khẩu mới"
                          name="new_pw"
                          rules={[{ required: true, message: 'Bạn cần nhập mật khẩu mới' }]}
                        >
                          <Input.Password />
                        </Form.Item>
                        <Form.Item
                          label="Nhập lại mật khẩu mới"
                          name="renew_pw"
                          rules={[{ required: true, message: 'Bạn cần nhập lại mật khẩu mới' }]}
                        >
                          <Input.Password />
                        </Form.Item>
                        <Row justify="end">
                          <Space>
                            <button
                              style={{ backgroundColor: 'black', color: 'white', width: '100px', border: 'none', height: '35px' }}
                              htmlType="submit"
                              className='btn-submit-change'
                            >Thay đổi</button>
                          </Space>
                        </Row>
                      </Form>
                    </div>
                  </div>
                </Col>
              </Row> : <h1 style={{ textAlign: 'center', marginTop: '70px' }}>Bạn cần đăng nhập để xem thông tin</h1>
          }
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { userInfo } = state.userReducer;
  const { orderList } = state.orderReducer;
  return {
    userInfo,
    orderList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: (params) => dispatch(getUserInfoAction(params)),
    updatePassword: (params) => dispatch(updatePasswordAction(params)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);

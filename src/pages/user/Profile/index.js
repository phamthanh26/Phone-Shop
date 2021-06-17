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
  Tabs,
  Radio,
  DatePicker,
  notification,
  Table,
  List
} from 'antd';
import 'moment/locale/vi';
import moment from 'moment';

import {
  getUserInfoAction,
  updateProfileAction,
} from '../../../redux/actions';
import {
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,

} from '@ant-design/icons';

const { SubMenu } = Menu;
function Profile({
  updateProfile,
}) {

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [userForm] = Form.useForm();

  const { TabPane } = Tabs;

  let birthdayString = '';
  const dateFormatList = 'DD/MM/YYYY';

  function onChange(date, dateString) {
    birthdayString = dateString.trim();
  }

  function showNotification() {
    return notification.success({
      message: 'Cập nhập hồ sơ thành công !',
    });
  }

  return (
    <div className="profile-main">
      <Row>
        <Col span={7} >
          <div className="profile-menu">

            <div style={{ width: 256 }}>
              <h1 style={{ height: '60px', borderBottom: '1px solid rgb(208, 213, 210)', paddingTop: '5px' }}>{userInfo ? userInfo.name : ""}</h1>
              <Menu
                defaultSelectedKeys={['1']}
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
          <h1 style={{ height: '60px', borderBottom: '1px solid rgb(208, 213, 210)' }}>THÔNG TIN TÀI KHOẢN</h1>
          {
            userInfo ?
              <Row>
                <Col span={8}>
                  <img style={{ width: '90%', paddingTop: '10px' }} src="https://www.computerhope.com/jargon/g/guest-user.jpg" />
                </Col>
                <Col span={16} >
                  <div className="profile-user-02">
                    <div style={{ width: "100%  ", backgroundColor: "white" }}>
                      <Form
                        form={userForm}
                        layout="vertical"
                        name="productForm"
                        initialValues={{
                          email: userInfo.email,
                          name: userInfo.name,
                          phone: userInfo.phone,
                          gender: userInfo.gender || '',
                          birthDay: userInfo.birthDay ? moment(userInfo.birthDay, dateFormatList) : null
                        }}
                        onFinish={(values) => {
                          const user = {
                            id: userInfo.id,
                            email: values.email,
                            name: values.name,
                            phone: values.phone,
                            gender: values.gender,
                            birthDay: birthdayString
                          }
                          updateProfile({
                            user: user
                          })
                          showNotification()
                        }}
                      >

                        <Form.Item
                          name="name"
                          label="Họ tên"
                          rules={[
                            {
                              required: true,
                              message: 'Tên không được để trống!',
                            },
                            { min: 3, message: 'Phải lớn hơn 3 ký tự' }
                          ]}
                        >
                          <Input className="text-bold">
                          </Input>
                        </Form.Item>
                        <Form.Item
                          name="phone"
                          label="Số điện thoại"
                          rules={[
                            {
                              required: true,
                              message: 'Số điện thoại không được để trống!',
                            },
                          ]}
                        >
                          <Input className="text-bold">
                          </Input>
                        </Form.Item>
                        <Form.Item
                          name="email"
                          label="Email"
                          rules={[
                            { required: true, message: 'Không được để trống!' },
                          ]}
                          hasFeedback
                        >
                          <Input className="text-bold" />
                        </Form.Item>
                        <Form.Item
                          name="birthDay"
                          label="Ngày sinh"
                          rules={[
                            {
                              required: true,
                              message: 'Vui lòng chọn ngày sinh!',
                            },
                          ]}
                        >
                          <DatePicker format={dateFormatList} style={{ width: '100%' }} onChange={onChange} placeholder="Nhập ngày, tháng, năm sinh" />
                        </Form.Item>
                        <Form.Item
                          name="gender"
                          label="Giới tính"
                          rules={[
                            {
                              required: true,
                              message: 'Vui lòng chọn giới tính!',
                            },
                          ]}
                        >
                          <Radio.Group>
                            <Radio value="Male">{<span className="text-bold">Nam</span>}</Radio>
                            <Radio value="Female">{<span className="text-bold">Nữ</span>}</Radio>
                            <Radio value="Other">{<span className="text-bold">Khác</span>}</Radio>
                          </Radio.Group>
                        </Form.Item>
                        <Row justify="end">
                          <Space>
                            <button
                              style={{ backgroundColor: 'black', color: 'white', width: '100px', border: 'none', height: '35px' }}
                              htmlType="submit"
                              className='btn-submit-change'
                            >
                              CẬP NHẬP
                  </button>
                          </Space>
                        </Row>
                      </Form>
                    </div>
                  </div>
                </Col>
              </Row> :
              <h1 style={{ textAlign: 'center', marginTop: '70px' }}>Bạn cần đăng nhập để xem thông tin</h1>
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
    updateProfile: (params) => dispatch(updateProfileAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

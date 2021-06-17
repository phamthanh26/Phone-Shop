import { Table, Popconfirm, Space, Input, Button, List, Row, Select, Form } from 'antd';

import { useEffect } from 'react';
import { connect } from 'react-redux';

import { getOrderListAction, reviewOrderListAction } from '../../../redux/actions';


function OrderManagementPage({
  getOrderList,
  orderList,
  reviewOrderList
}) {
  
  useEffect(() => {
    getOrderList({
      status : null
    });
  }, []);
  const { Search } = Input;
  const onSearch = value => console.log(value);

  const { Option } = Select;

  function onSelect(value) {
    getOrderList({
      status : value
    });
  }

  function handleConfirm(id) {
    orderList.data.forEach((item) => {
      if (item.id === id) {
        reviewOrderList({
          order: {
              userName: item.fullName,
              phone: item.phone,
              address: item.address,
              totalPrice: item.totalPrice,
              date: item.date,
              time: item.time,
              carts: [...item.carts],
            id: id,
            userId: item.userId,
            status: 'confirmed'
          }, id: id
        });
      }
    })
  }

  function handleCancel(id) {
    orderList.data.forEach((item) => {
      if (item.id === id) {
        reviewOrderList({
          order: {
           
            userName: item.userName,
              phone: item.phone,
              address: item.address,
              totalPrice: item.totalPrice,
              date: item.date,
              time: item.time,
              carts: [...item.carts],
 
            userId: item.userId,             
            id: id,
            status: 'cancelled'
          }, id: id
        });
      }
    })
  }

  const tableData = orderList.data.map((item) => {
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
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => {
        if (record.status == 'waiting') {
          return (
            <Space>
              <Button type="primary" ghost
                onClick={() => { handleConfirm(record.id) }}
              >
                Xác nhận
              </Button>
              <Popconfirm
                title={`Bạn có chắc muốn hủy đơn hàng này`}
                onConfirm={() => { handleCancel(record.id) }}
                okText="Xóa"
                cancelText="Hủy"
              >
                <Button danger >Hủy </Button>
              </Popconfirm>
            </Space>
          )
        } else if (record.status == 'confirmed') {
          return (
            <div>Đã xác nhận đơn hàng</div>
          )
        } else {
          return (
            <div>Đã hủy đơn hàng</div>
          )
        }
      }
    },
  ];

  return (
    <div className='home' >
      <h2>Quản lý đơn hàng</h2>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '14px'
      }}
      >
        {/* <Search
          placeholder="Nhập vào thông tin"
          allowClear
          enterButton="Tìm kiếm"
          size="large"
          style={{ width: 400 }}
          onSearch={(value)=>{getOrderList({searchKey : value})}}
        /> */}
        <div>
          <Select defaultValue = "Chọn loại đơn hàng" style={{ width: 200 }} onSelect={onSelect}>
            <Option >Tất cả đơn hàng</Option>
            <Option value="waiting">Đang đợi xác nhận</Option>
            <Option value="confirmed">Đã xác nhận</Option>
            <Option value="cancelled">Đã hủy</Option>
          </Select>
        </div>
      </div>
      <Table
        loading={orderList.load}
        size="middle"
        columns={tableColumns}
        dataSource={tableData}
        expandable={{
          expandedRowRender: (record) => {
            return (
              <List
                size="small"
                dataSource={record.carts}
                renderItem={(item) => (
                  <List.Item>
                    <Row justify="space-between" style={{ width: '100%' }}>
                      <div>{item.name}</div>
                      <div>Giá: {(item.price * item.count).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</div>
                    </Row>
                  </List.Item>
                )}
              />
            )
          }
        }}
      />
    </div>
  );
}
const mapStateToProps = (state) => {
  const { orderList } = state.orderReducer;
  return {
    orderList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrderList: (params) => dispatch(getOrderListAction(params)),
    reviewOrderList: (params) => dispatch(reviewOrderListAction(params)),

  };
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderManagementPage);

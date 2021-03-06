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
      title: 'T??n ng?????i nh???n',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '?????a ch???',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Th???i gian',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'T???ng ti???n',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    },
    {
      title: 'H??nh ?????ng',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => {
        if (record.status == 'waiting') {
          return (
            <Space>
              <Button type="primary" ghost
                onClick={() => { handleConfirm(record.id) }}
              >
                X??c nh???n
              </Button>
              <Popconfirm
                title={`B???n c?? ch???c mu???n h???y ????n h??ng n??y`}
                onConfirm={() => { handleCancel(record.id) }}
                okText="X??a"
                cancelText="H???y"
              >
                <Button danger >H???y </Button>
              </Popconfirm>
            </Space>
          )
        } else if (record.status == 'confirmed') {
          return (
            <div>???? x??c nh???n ????n h??ng</div>
          )
        } else {
          return (
            <div>???? h???y ????n h??ng</div>
          )
        }
      }
    },
  ];

  return (
    <div className='home' >
      <h2>Qu???n l?? ????n ha??ng</h2>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '14px'
      }}
      >
        {/* <Search
          placeholder="Nh???p v??o th??ng tin"
          allowClear
          enterButton="T??m ki???m"
          size="large"
          style={{ width: 400 }}
          onSearch={(value)=>{getOrderList({searchKey : value})}}
        /> */}
        <div>
          <Select defaultValue = "Ch???n lo???i ????n h??ng" style={{ width: 200 }} onSelect={onSelect}>
            <Option >T???t c??? ????n h??ng</Option>
            <Option value="waiting">??ang ?????i x??c nh???n</Option>
            <Option value="confirmed">???? x??c nh???n</Option>
            <Option value="cancelled">???? h???y</Option>
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
                      <div>Gi??: {(item.price * item.count).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</div>
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

import { Table, Modal, Switch, Input, Button, Popconfirm } from 'antd';
import { DeleteOutlined ,CloseOutlined} from '@ant-design/icons';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';

import {
  addCategoryListAction,
  deleteCategoryListAction,
  editCategoryListAction,
  getCategoryListAction
}
  from '../../../redux/actions';


function CategoryManagementPage({
  getCategoryList,
  categoryList,
  editCategoryList,
  deleteCategoryList,
  addCategoryList
}) {

  const { Search } = Input;
  const onSearch = value => console.log(value);

  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [valueInput, setValueInput] = useState('');


  useEffect(() => {
    getCategoryList({});
  }, []);

  function handleDeleteCategory(id) {
    deleteCategoryList({ id: id })
  }

  function handleAddCategory() {
    const newCategory = {
      name: valueInput,
      status: 'off'
    }
    addCategoryList({
      category: newCategory
    })
    setIsModalVisible2(false)
  }

  function handleEditCategory(id, status) {
    const newStatus = status === 'on' ? 'off' : 'on'
    categoryList.data.forEach((item) => {
      if (id === item.id) {
        const category = {
          id: item.id,
          name: item.name,
          status: newStatus
        }
        editCategoryList({
          id: id,
          category: category
        })
      }
    })
  }

  const tableColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên hãng ',
      dataIndex: 'name',
      key: 'name',
    },
    
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          
          <Popconfirm
            title={`Bạn có chắc muốn xóa hãng ${record.name}`}
            onConfirm={() => { handleDeleteCategory(record.id) }}
          >
          <CloseOutlined 
              style={{
                color: 'red',
                cursor: 'pointer',
                fontSize: '180%',
                
              }}
            />
          </Popconfirm>
          <div></div>
        </div>
      )
    },
  ];

  return (
    <div className='category'>
      <Modal title="Thêm hãng sản phẩm"
        width="800px"
        visible={isModalVisible2}
        onOk={() => { handleAddCategory() }}
        onCancel={() => { setIsModalVisible2(false) }}
        okText='Thêm'
        cancelText='Hủy'
      >
        <Input placeholder="Tên hãng sản phẩm"
          onChange={(e) => { setValueInput(e.target.value) }}
        />
      </Modal>
      <h2>Quản lý hãng</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
        {/* <Search
          placeholder="Nhập vào thông tin"
          allowClear
          enterButton="Tìm kiếm"
          size="large"
          style={{ width: 400 }}
          onSearch={(value)=>{getCategoryList({searchKey : value})}}
        /> */}
        <div>
          <Button type="primary"
            style={{ height: '100%' }}
            onClick={() => { setIsModalVisible2(true) }}
          >
            Thêm hãng
          </Button>
        </div>
      </div>
      <Table
        dataSource={categoryList.data}
        loading={categoryList.load}
        columns={tableColumns}
        size='middle'
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  const { categoryList } = state.productReducer;
  return {
    categoryList,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategoryList: (params) => dispatch(getCategoryListAction(params)),
    editCategoryList: (params) => dispatch(editCategoryListAction(params)),
    deleteCategoryList: (params) => dispatch(deleteCategoryListAction(params)),
    addCategoryList: (params) => dispatch(addCategoryListAction(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryManagementPage);

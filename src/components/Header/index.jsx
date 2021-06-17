import { connect } from 'react-redux';
import { Button, Menu, Space, Dropdown, Input, Badge } from 'antd';
import { ShoppingCartOutlined, DownOutlined, SearchOutlined } from '@ant-design/icons';
import {  useState } from 'react';
import history from '../../utils/history';
import './style.css'

import {
    addSearchProductAction
} from '../../redux/actions';

const { Search } = Input;
function BrowserHeader({ userInfo, cartList, addSearchProduct }) {

    const userInfoLocal = JSON.parse(localStorage.getItem("userInfo"));
    function handleLogout() {
        localStorage.removeItem("userInfo");
        window.location.reload();
    }
    const [searchValue, setSearchValue] = useState();

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            addSearchProduct({ searchValue });
            history.push('/search');
            setSearchValue('')
        }
    }

    const menu = (
        <Menu className="header-menu-icon">
            <Menu.Item key="0" >
                <Button onClick={() => history.push('/profile')} className="header-menu-icon-01" >
                    thông tin cá nhân
                        </Button>
            </Menu.Item>
            {
                userInfo.data.role === "admin" ?
                    <Menu.Item key="1" >
                        <Button onClick={() => history.push('/admin')} className="header-menu-icon-01">
                            trang admin
                        </Button>
                    </Menu.Item>
                    : ""
            }
            <Menu.Item key="2" >
                <Button onClick={() => { handleLogout() }} to='/login' className="header-menu-icon-01">
                    Đăng xuất
                        </Button>
            </Menu.Item>
        </Menu>
    );
    return (
        <div className="header-container ">
            <div className="brand-name">

                <h2 onClick={() => history.push('/')} >Zphone</h2>
            </div>
            <div className="header-menu">
                <>
                    <Button type="primary" onClick={() => history.push('/')} className="header-menu-main" >
                        Trang chủ
                     </Button>
                </>
                <>
                    <Button type="primary" onClick={() => history.push('/product')} className="header-menu-main">
                        Sản phẩm
                     </Button>
                </>
                <>
                    <Button type="primary" onClick={() => history.push('/contact')} className="header-menu-main">
                       Liên hệ
                     </Button>
                </>
            </div>
            <div className="header-search">  <Input
                placeholder='Tìm sản phẩm'
                onChange={(e) => { setSearchValue(e.target.value) }}
                value={searchValue}
                onKeyDown={handleKeyDown}
                style={{ height: '35px' }}
            />
                {
                    searchValue ?
                        <button
                            className="btn-search"
                            onClick={() => {
                                addSearchProduct({ searchValue });
                                history.push('/search');
                                setSearchValue('')
                            }}
                        >
                            <SearchOutlined />
                        </button> :
                        <button
                            className="btn-search"
                        >
                            <SearchOutlined />
                        </button>
                }
            </div>
            <h2 className="brand-name-01">
                <div className='header-icon'>
                    {userInfo.data.id
                        ? (
                            <Space >
                                <div >
                                    <Badge count={`${cartList.data.length}`} showZero offset={[10, 10]}>
                                        <Button icon={<ShoppingCartOutlined />} onClick={() => history.push('/carts')} className="icon-card" />

                                    </Badge>
                                </div>
                                <div >

                                    <Dropdown overlay={menu}>
                                        <div className="header-user" onClick={e => e.preventDefault()}>
                                            <div className="header-user-name"> {`${userInfo.data.name}`} </div>     
                                             <img className="header-user-name-icon" src="https://img.icons8.com/ios-filled/50/000000/user-male-circle.png" /><DownOutlined />
                                        </div>
                                    </Dropdown>
                                </div>
                            </Space>
                        )
                        : (
                            <Space size={32}>
                                <p onClick={() => history.push('/carts')}></p>
                                <Button icon={<ShoppingCartOutlined />} onClick={() => history.push('/carts')} />
                                <div className="header-user-1">
                                    <img src="https://img.icons8.com/ios-filled/50/000000/user-male-circle.png" onClick={() => history.push('/login')} />
                                </div>
                            </Space>
                        )
                    }
                </div>
            </h2>
        </div>
    );
}

const mapStateToProps = (state) => {
    const { userInfo } = state.userReducer;
    const { cartList } = state.cartReducer;
    return {
        userInfo,
        cartList
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        addSearchProduct: (params) => dispatch(addSearchProductAction(params)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BrowserHeader)

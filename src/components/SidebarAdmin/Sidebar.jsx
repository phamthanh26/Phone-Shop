import history from '../../utils/history'
import './styles.css';
import { Layout, Menu } from 'antd';
import {
  ShoppingCartOutlined,
  UserOutlined,
  ShopOutlined,
  HomeOutlined,
  ProfileOutlined,
  ArrowLeftOutlined,
  TableOutlined,
  LogoutOutlined,
  UsergroupAddOutlined
} from '@ant-design/icons';


const { Sider } = Layout;
function Sidebar() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  function handleLogout() {
    localStorage.removeItem("userInfo");
    window.location.reload();
  }
  return (
    <Layout >
      <Sider
        style={{ backgroundColor: 'rgb(35, 39, 37)', height: '100vh' }}
        width="260px"
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
       
        <Menu theme="" mode="inline" defaultSelectedKeys={['1']} style={{backgroundColor : 'rgb(35, 39, 37)' , color : 'white'}}>
          <Menu.Item key="1" icon={<HomeOutlined />} onClick={() => { history.push('/admin') }}>
          Trang Chủ
        </Menu.Item>

        <Menu.Item key="3" icon={<ShoppingCartOutlined />} onClick={() => { history.push('/admin/order') }}>
             Quản lý đơn hàng
         </Menu.Item>


         <Menu.Item key="4" icon={<UsergroupAddOutlined />} onClick={() => { history.push('/admin/user') }}>
            Quản lý thành viên
        </Menu.Item>

        <Menu.Item key="5" icon={<ProfileOutlined />} onClick={() => { history.push('/admin/category') }}>
            Quản lý hãng
        </Menu.Item>

        <Menu.Item key="6" onClick={() => { history.push('/') }}>
        <ArrowLeftOutlined />Quay về trang mua hàng
        </Menu.Item>
        </Menu>
      </Sider>
    </Layout>
  );
}

export default Sidebar;

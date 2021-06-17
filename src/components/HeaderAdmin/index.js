import history from '../../utils/history'
import './styles.css';
import { Layout, Menu } from 'antd';
import {
  LogoutOutlined,
} from '@ant-design/icons';


function HeaderAdmin() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  function handleLogout() {
    localStorage.removeItem("userInfo");
    window.location.reload();
  }
  return (
    <Layout >
        <div  className="header-admin">
        <div style={{fontSize : '30px' , color : 'white' , marginLeft : '30px'}}>Zphone</div>
       <div className="header-admin-user" onClick={() => { handleLogout() }} > {userInfo.name} <img style={{color : 'white'}} src="https://img.icons8.com/ios-filled/50/ffffff/user-male-circle.png"/></div>
        </div>
        
    
    </Layout>
  );
}

export default HeaderAdmin;

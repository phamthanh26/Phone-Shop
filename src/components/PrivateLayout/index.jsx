import { Route, Redirect } from 'react-router-dom';
import Header from '../Header';
import SidebarAdmin from '../SidebarAdmin/Sidebar'
import HeaderAdmin from '../HeaderAdmin'

function PrivateLayout(props) {
  const { exact, path, component: Component, ...other } = props;
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (userInfo && userInfo.id) {
    if (userInfo.role !== 'admin') {
      return <Redirect to="/" />;
    }
  } else {
    return <Redirect to="/login" />;
  }
  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => {
        return (
          <>
           <HeaderAdmin/>
           <div style={{ display: 'flex', maxWidth: '1370px', margin: 'auto' }}>
              <SidebarAdmin {...routeProps} />
              <div style={{ width: 'calc(100% - 300px)', marginLeft: '40px', marginRight : '40px', marginTop: '14px' }}>
                <Component {...other} {...routeProps} />
              </div>
            </div>
          </>
        )
      }}
    />
  );
}

export default PrivateLayout;

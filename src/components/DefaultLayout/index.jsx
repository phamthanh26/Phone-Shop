import { Route } from 'react-router-dom';
import BrowserHeader from '../Header'
import { Layout } from 'antd';
import './style.css'
import Footer from "../Footer"

const { Header, Content } = Layout;
function DefaultLayout(props) {
  const { exact, path, component: Component, ...other } = props;
  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => {
        return (
          <>
            <div className="mainLayout">
              <Layout >
                <BrowserHeader />
                <Content className="heroBlock">
                  <Component {...other} {...routeProps} />
                </Content>
                <Footer />
              </Layout>
            </div>
          </>
        )
      }}
    />
  );
}

export default DefaultLayout;

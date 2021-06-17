import React from 'react';
import { Router, Switch } from 'react-router-dom';
import history from './utils/history';
import { ROUTERS } from './constants/router';

import DefaultLayout from './components/DefaultLayout';
import LoginLayout from './components/LoginLayout';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import Register from './pages/Register'
import Profile from './pages/user/Profile'
import Cart from './pages/user/CartList'
import ProductListPage from './pages/user/ProductList'
import ProductDetailPage from './pages/user/ProductDetail'
import OrderPay from './pages/user/Pay'

import PrivateLayout from './components/PrivateLayout';
import HomeAdminPage from './pages/admin/Home';
import OrderCategoryPage from './pages/admin/OrderPage';
import AdminUserPage from './pages/admin/UserPage';
import AdminCategoryPage from './pages/admin/Category';
import OderUser from './pages/user/OderUser'
import EditPassword from './pages/user/EditPassword'
import SearchPage from './pages/Search'
import OderDone from './pages/user/OderDone';
import Introduce from './components/Introduce';
function BrowserRouter() {
  return (
    <Router history={history}>
      <Switch>
        <DefaultLayout exact path={ROUTERS.HOME} component={HomePage} />
        <LoginLayout exact path={ROUTERS.LOGIN} component={LoginPage} />
        <LoginLayout exact path={ROUTERS.REGISTER} component={Register} />
        <DefaultLayout exact path={ROUTERS.PROFILE} component={Profile} />
        <DefaultLayout exact path={ROUTERS.CART} component={Cart} />
        <DefaultLayout exact path={ROUTERS.PRODUCT_LIST} component={ProductListPage} />
        <DefaultLayout exact path={ROUTERS.PRODUCT_DETAIL} component={ProductDetailPage} />
        <DefaultLayout exact path={ROUTERS.ORDER} component={OrderPay} />
        <DefaultLayout exact path="/orderUser" component={OderUser} />
        <DefaultLayout exact path="/editPassword" component={EditPassword} />
        <DefaultLayout exact path="/search" component={SearchPage} />
        <DefaultLayout exact path="/done" component={OderDone} />
        <DefaultLayout exact path="/contact" component={Introduce} />

        <PrivateLayout exact path="/admin" component={HomeAdminPage} />
        <PrivateLayout exact path="/admin/order" component={OrderCategoryPage} />
        <PrivateLayout exact path="/admin/user" component={AdminUserPage} />
        <PrivateLayout exact path="/admin/category" component={AdminCategoryPage} />
      </Switch>
    </Router>
  )
}

export default BrowserRouter

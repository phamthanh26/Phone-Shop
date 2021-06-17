import { combineReducers } from 'redux';
import productReducer from './product.reducer';
import userReducer from './user.reducer';
import cartReducer from './cart.reducer';
import orderReducer from './order.reducer';
import commentReducer from './comment.reducer';
import checkoutReducer from './checkout.reducer';
import addressReducer from './address.reducer'
import billReducer from './bill.reducer';
export default combineReducers({
  productReducer,
  userReducer,
  cartReducer,
  orderReducer,
  commentReducer,
  checkoutReducer,
  billReducer,
  addressReducer,
});

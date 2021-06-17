import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* addToCartSaga(action) {
  try {
    const {id, userId, carts } = action.payload;
    const result = yield axios({
      method: 'PATCH',
      url: `http://localhost:3001/users/${userId}`,
      data: {
        carts: carts,
        id :id
      }
    });
    yield put({
      type: "ADD_TO_CART_SUCCESS",
      payload: {
        data: result.data.carts,
        id :id
      },
    });
  } catch (e) {
    yield put({
      type: "ADD_TO_CART_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* deleteItemCartSaga(action) {
  try {
    const { userId, carts } = action.payload;
    const result = yield axios({
      method: "PATCH",
      url: `http://localhost:3001/users/${userId}`,
      data: {
        carts: carts,
      },
    });
    yield put({
      type: "DELETE_ITEM_CART_SUCCESS",
      payload: {
        data: result.data.carts,
      },
    });
  } catch (e) {
    yield put({
      type: "DELETE_ITEM_CART_FAIL",
      payload: {
        error: e.error,
      },
    });
  }
}

// Thanh toán saga

// yield axios({
//   method: 'POST',
//   url: 'http://localhost:3001/orders',
//   data: {
//     userId: userId,
//     address: '123',
//     total: 300000000,
//     time: '2021/05/14 20:30',
//     carts: carts,
//   }
// });
// yield axios({
//   method: 'PATCH',
//   url: `http://localhost:3001/users/${userId}`,
//   data: {
//     carts: [],
//   }
// });

export default function* cartSaga() {
  yield takeEvery('ADD_TO_CART_REQUEST', addToCartSaga);
  yield takeEvery("DELETE_ITEM_CART_REQUEST", deleteItemCartSaga);
}

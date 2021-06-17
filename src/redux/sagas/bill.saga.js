import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* addBillTaskSaga(action) {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      address,
      country,
      userId,
      city,
      district,
      ward
    } = action.payload
    const result = yield axios({
      method: 'POST',
      url: 'http://localhost:3001/bill',
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        company: company,
        address: address,
        country: country,
        userId: userId,
        city: city,
        district: district,
        ward:ward
      }
    });
    yield put({
      type: "ADD_BILL_TASK_SUCCESS",
      payload: {
        data: result.data
      },
    });
  } catch (e) {
    yield put({
      type: "ADD_BILL_TASK_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

export default function* billSaga() {
  yield takeEvery('ADD_BILL_TASK_REQUEST', addBillTaskSaga);
}

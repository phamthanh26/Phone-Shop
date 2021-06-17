import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* addToCommentSaga(action) {
  try {
    const { comment } = action.payload;
    const result = yield axios({
      method: "POST",
      url: `http://localhost:3001/comments/`,
      data: {
        ...comment
      },
    });
    yield put({
      type: "ADD_TO_COMMENT_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "ADD_TO_COMMENT_FAIL",
      payload: {
        error: e.error,
      },
    });
  }
}

function* getCommentListSaga(action) {
  try {
    const { productId } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: `http://localhost:3001/comments?productId=${productId}`,
      params: {
        _sort: "id",
        _order: "desc"
      }
    });
    yield put({
      type: "GET_COMMENT_LIST_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "GET_COMMENT_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* getAllCommentSaga(action) {
  try {
    const result = yield axios({
      method: 'GET',
      url: `http://localhost:3001/comments`,
      params: {
        _sort: "id",
        _order: "desc"
      }
    });
    yield put({
      type: "GET_ALL_COMMENT_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "GET_ALL_COMMENT_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}
export default function* commentSaga() {
  yield takeEvery("ADD_TO_COMMENT_REQUEST", addToCommentSaga);
  yield takeEvery('GET_COMMENT_LIST_REQUEST', getCommentListSaga);
  yield takeEvery('GET_ALL_COMMENT_REQUEST', getAllCommentSaga);
}
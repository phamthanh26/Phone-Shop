import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getProductListSaga(action) {
  try {
    const {  more, page, limit, categoryId, searchKey,searchValue } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3001/products',
      params: {
        _page: page,
        _limit: limit,
      
        ...categoryId && { categoryId },
        _expand: 'category',
        _sort : "id",
        _order: "desc",
        ...searchKey && { q: searchKey },
        ...searchValue && { q: searchValue },
      }
    });
    yield put({
      type: "GET_PRODUCT_LIST_SUCCESS",
      payload: {
        data: result.data,
        page,
        more,
      },
    });
  } catch (e) {
    yield put({
      type: "GET_PRODUCT_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* getProductDetailSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios({
      method: 'GET',
      url: `http://localhost:3001/products/${id}?_embed=productOptions&_embed=productCapacity&_expand=category`,
      params: {
        // _embed: 'productOptions',
        // // _embed: 'productCapacity',
        // _expand: 'category'
      }
    });
    yield put({
      type: "GET_PRODUCT_DETAIL_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({type: "GET_PRODUCT_DETAIL_FAIL", message: e.message});
  }
}


//



function* addCategorySaga(action) {
  try {
    const { category } = action.payload;
    const result = yield axios({
      method: 'POST',
      url: `http://localhost:3001/categories/`,
      data: {
        name: category.name,
        status: category.status
      }
    });
    yield put({ type: "GET_CATEGORY_LIST_REQUEST" });
    yield put({
      type: "ADD_CATEGORY_LIST_SUCCESS",
      payload: {
        data: result.data
      }
    });
  } catch (e) {
    yield put({
      type: "ADD_CATEGORY_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}
function* deleteCategorySaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios({
      method: 'DELETE',
      url: `http://localhost:3001/categories/${id}`,
    });
    yield put({ type: "GET_CATEGORY_LIST_REQUEST" });
    yield put({
      type: "DELETE_CATEGORY_LIST_SUCCESS",
      payload: {
        id: id,
      }
    });
  } catch (e) {
    yield put({
      type: "DELETE_CATEGORY_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}
function* editCategorySaga(action) {
  try {
    const { id, category } = action.payload;
    const result = yield axios({
      method: 'PATCH',
      url: `http://localhost:3001/categories/${id}`,
      data: {
        name: category.name,
        status: category.status
      }
    });
    yield put({ type: "GET_CATEGORY_LIST_REQUEST" });
    yield put({
      type: "EDIT_CATEGORY_LIST_SUCCESS",
      payload: {
        id: id,
        data: result.data
      }
    });
  } catch (e) {
    yield put({
      type: "EDIT_CATEGORY_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

function* getCategoryListSaga(action) {
  try {
    const result = yield axios({
      method: 'GET',
      url: 'http://localhost:3001/categories',
    });
    yield put({
      type: "GET_CATEGORY_LIST_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "GET_CATEGORY_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}
//search

export default function* productSaga() {
  yield takeEvery('GET_PRODUCT_LIST_REQUEST', getProductListSaga);
  yield takeEvery('GET_PRODUCT_DETAIL_REQUEST', getProductDetailSaga);
  yield takeEvery('GET_CATEGORY_LIST_REQUEST', getCategoryListSaga);

  yield takeEvery('ADD_CATEGORY_LIST_REQUEST', addCategorySaga);
  yield takeEvery('EDIT_CATEGORY_LIST_REQUEST', editCategorySaga);
  yield takeEvery('DELETE_CATEGORY_LIST_REQUEST', deleteCategorySaga);
}

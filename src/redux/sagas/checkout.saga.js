import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getCitySaga(action) {
    try {
        const result = yield axios({
            method: 'GET',
            url: 'http://localhost:3001/city',
        });
        yield put({
            type: 'GET_CITY_SUCCESS',
            payload: {
                data: result.data
            },
        });
    } catch (e) {
        yield put({
            type: 'GET_CITY_FAIL',
            payload: {
                error: e.error
            },
        });
    }
}


function* getDistrictSaga(action) {
    try {
        const { parentcode } = action.payload
        const result = yield axios({
            method: 'GET',
            url: 'http://localhost:3001/district',
            params: {
                ...parentcode && { parentcode },
            }
        });
        yield put({
            type: 'GET_DISTRICT_SUCCESS',
            payload: {
                data: result.data,
            },
        });
    } catch (e) {
        yield put({
            type: 'GET_DISTRICT_FAIL',
            payload: {
                error: e.error
            },
        });
    }
}


function* getWardSaga(action) {
    try {
        const { parentcode } = action.payload
        const result = yield axios({
            method: 'GET',
            url: 'http://localhost:3001/wards',
            params: {
                ...parentcode && { parentcode },
            }
        });
        yield put({
            type: 'GET_WARD_SUCCESS',
            payload: {
                data: result.data
            },
        });
    } catch (e) {
        yield put({
            type: 'GET_WARD_FAIL',
            payload: {
                error: e.error
            },
        });
    }
}


export default function* categoriesSaga() {
    yield takeEvery('GET_CITY_REQUEST', getCitySaga);
    yield takeEvery('GET_DISTRICT_REQUEST', getDistrictSaga);
    yield takeEvery('GET_WARD_REQUEST', getWardSaga);
}

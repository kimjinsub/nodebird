import axios from "axios";
import { all, delay, fork, put, takeLatest } from "redux-saga/effects";
import {
    LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS,
    LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS
} from "../reducers/user";

function logInAPI() {
    return axios.post('/api/login')
}

function* logIn(action) {
    try {
        // const result = yield call(logInAPI, action.data);
        yield delay(1000);
        yield put({
            type: LOG_IN_SUCCESS,
            data: action.data
        })
    } catch (err) {
        yield put({
            type: LOG_IN_FAILURE,
            error: err.response.data
        })
    }
}
function logOutAPI() {
    return axios.post('/api/logout')
}

function* logOut() {
    try {
        // const result = yield call(logOutAPI);
        yield delay(1000);
        yield put({
            type: LOG_OUT_SUCCESS,
            // data: result.data
        })
    } catch (err) {
        yield put({
            type: LOG_OUT_FAILURE,
            error: err.response.data
        })
    }
}

function* watchLogIn() {
    // while (true) {
    yield takeLatest(LOG_IN_REQUEST, logIn);
    // }
}
function* watchLogOut() {
    // while (true) {
    yield takeLatest(LOG_OUT_REQUEST, logOut);
    // }
}

export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut)
    ])
}
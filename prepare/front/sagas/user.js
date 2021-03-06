import axios from "axios";
import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import {
    FOLLOW_FAILURE,
    FOLLOW_REQUEST,
    FOLLOW_SUCCESS,
    LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS,
    LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS,
    SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, UNFOLLOW_FAILURE, UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS
} from "../reducers/user";

function followAPI() {
    return axios.post('/api/follow')
}

function* follow(action) {
    try {
        // const result = yield call(followAPI);
        yield delay(1000);
        yield put({
            type: FOLLOW_SUCCESS,
            data: action.data
        })
    } catch (err) {
        yield put({
            type: FOLLOW_FAILURE,
            error: err.response.data
        })
    }
}
function unfollowAPI() {
    return axios.post('/api/unfollow')
}

function* unfollow(action) {
    try {
        // const result = yield call(unfollowAPI);
        yield delay(1000);
        yield put({
            type: UNFOLLOW_SUCCESS,
            data: action.data
        })
    } catch (err) {
        yield put({
            type: UNFOLLOW_FAILURE,
            error: err.response.data
        })
    }
}
function logInAPI(data) {
    return axios.post('/user/login', data);
}

function* logIn(action) {
    try {
        const result = yield call(logInAPI, action.data);
        yield put({
            type: LOG_IN_SUCCESS,
            data: result.data
        })
    } catch (err) {
        yield put({
            type: LOG_IN_FAILURE,
            error: err.response.data
        })
    }
}
function logOutAPI() {
    return axios.post('/logout')
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
function signUpAPI(data) {
    return axios.post('/user', data);
}

function* signUp(action) {
    try {
        const result = yield call(signUpAPI, action.data);
        console.log(result);
        yield put({
            type: SIGN_UP_SUCCESS,
            data: action.data
        })
    } catch (err) {
        yield put({
            type: SIGN_UP_FAILURE,
            error: err.response.data
        })
    }
}

function* watchFollow() {
    // while (true) {
    yield takeLatest(FOLLOW_REQUEST, follow);
    // }
}
function* watchUnfollow() {
    // while (true) {
    yield takeLatest(UNFOLLOW_REQUEST, unfollow);
    // }
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
function* watchSignUp() {
    // while (true) {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
    // }
}

export default function* userSaga() {
    yield all([
        fork(watchFollow),
        fork(watchUnfollow),
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp)
    ])
}
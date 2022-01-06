import { all, fork } from 'redux-saga/effects';
import postSaga from './post';
import userSaga from './user';


export default function* rootSaga() {
    yield all([
        fork(postSaga),
        fork(userSaga)
    ])
}

{/*
    fork: 비동기(non-blocking)
    call: 동기(blocking)

    takeEvery: 비동기(non-blocking)
    while(true){take}: 동기(blocking)

    takeLatest: 같은 요청을 여러번 보냈을 경우, 응답을 받으면 나머지는 무시.
                요청은 여러번 가기때문에, back단에서 중복처리 필요함.
    throttle: 같은 요청을 여러번 보냈을 경우, 한번만 요청하고 나머지 요청은 무시.
    debounce: 같은 요청을 여러번 보냈을 경우, 마지막요청만 처리하고 나머지 요청은 무시.
*/}
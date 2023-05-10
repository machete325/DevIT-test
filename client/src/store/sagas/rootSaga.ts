import { all } from 'redux-saga/effects';
import { watchAuthSaga } from './authSaga';
import { watchInitAppSaga } from './initAppSaga';
import { watchPostSaga } from './post/postSaga';

export function* rootSaga() {
    yield all([
        watchInitAppSaga(),
        watchAuthSaga(),
        watchPostSaga(),
    ]);
}

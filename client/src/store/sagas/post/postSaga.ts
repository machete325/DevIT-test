import { all } from 'redux-saga/effects';
import { watchDeletePostSaga } from './deletePostSaga';
import { watchGetAvailablePostsSaga } from './getAvailablePostsSaga';
import { watchCreatePostSaga } from './savePostSaga';

export function* watchPostSaga() {
    yield all([
        watchGetAvailablePostsSaga(),
        watchCreatePostSaga(),
        watchDeletePostSaga(),
    ]);
}

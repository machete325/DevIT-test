import { getType } from 'typesafe-actions';
import {
    put,
    takeLatest,
} from 'redux-saga/effects';
import { initAppAction } from '../actions';
import { getUserRawSaga } from './user/getUserRawSaga';

export function* initAppSaga() {
    try {

        yield getUserRawSaga();

        yield put(initAppAction.success());
    } catch (e: unknown) {
        console.error(e);

        yield put(initAppAction.failure('There was an error initializing the application'));
    }
}

export function* watchInitAppSaga() {
    yield takeLatest(getType(initAppAction.request), initAppSaga);
}

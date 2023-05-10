import { toast } from 'react-toastify';
import {
    all,
    call,
    getContext,
    put,
    takeLatest,
} from 'redux-saga/effects';
import {
    ActionType,
    getType,
} from 'typesafe-actions';
import { POSTS_ROUTE } from '../../common/constants/routes';
import { loginAction } from '../actions/authActions';
import { loginRequest } from '../../api/authApi';
import { createBrowserRouter } from 'react-router-dom';

export function* loginSaga(action: ActionType<typeof loginAction.request>) {
    try {
        yield call(loginRequest, action.payload);

        yield put(loginAction.success());

        const router: ReturnType<typeof createBrowserRouter> = yield getContext('router');

        router.navigate(POSTS_ROUTE);
    } catch (e: unknown) {
        console.error(e);

        toast.error('Invalid email or password');

        yield put(loginAction.failure());
    }
}

export function* watchLoginSaga() {
    yield takeLatest(getType(loginAction.request), loginSaga);
}

export function* watchAuthSaga() {
    yield all([
        watchLoginSaga(),
    ]);
}

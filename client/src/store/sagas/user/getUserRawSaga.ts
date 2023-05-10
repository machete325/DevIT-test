import {
    call,
    put,
} from 'redux-saga/effects';
import { User } from '../../../types/users/User';
import { getUserApi } from '../../../api/user/getUserApi';
import { getUserAction } from '../../actions/user';

export function* getUserRawSaga() {
    const user: User = yield call(getUserApi);

    yield put(getUserAction.success(user));
}

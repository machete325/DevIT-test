import {
    call,
    put,
    takeLatest,
} from 'redux-saga/effects';
import {
    ActionType,
    getType,
} from 'typesafe-actions';
import { toast } from 'react-toastify';
import {
    deletePostAction,
    getAvailablePostsAction,
} from '../../actions/post';
import { deletePostApi } from '../../../api/posts/deletePostApi';

export function* deletePostSaga(
    action: ActionType<typeof deletePostAction.request>,
) {
    try {
        yield call(deletePostApi, action.payload);

        yield put(deletePostAction.success());

        toast.success('Post deleted successfully');

        yield put(getAvailablePostsAction.request());
    } catch (e: unknown) {
        console.error(e);

        toast.error('An error occurred while trying to delete the post. Try again');

        yield put(deletePostAction.failure());
    }
}

export function* watchDeletePostSaga() {
    yield takeLatest(getType(deletePostAction.request), deletePostSaga);
}

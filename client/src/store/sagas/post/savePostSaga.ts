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
    getAvailablePostsAction,
    savePostAction,
} from '../../actions/post';
import { Post } from '../../../types/post/Post';
import { editPostApi } from '../../../api/posts/editPostApi';
import { createPostApi } from '../../../api/posts/createPostApi';
import { has } from 'lodash';

export function* savePostSaga(
    action: ActionType<typeof savePostAction.request>,
) {
    try {
        const post: Post = has(action.payload, 'id')
            ? yield call(editPostApi, action.payload)
            : yield call(createPostApi, action.payload);

        yield put(savePostAction.success(post));

        toast.success('Post saved successfully');

        yield put(getAvailablePostsAction.request());
    } catch (e: unknown) {
        console.error(e);

        toast.error('An error occurred while trying to save the post. try again');

        yield put(savePostAction.failure());
    }
}

export function* watchCreatePostSaga() {
    yield takeLatest(getType(savePostAction.request), savePostSaga);
}

import {
    call,
    put,
    takeLatest,
} from 'redux-saga/effects';
import {
    ActionType,
    getType,
} from 'typesafe-actions';
import { getAvailablePostsApi } from '../../../api/posts/getAvailablePostsApi';
import { Post } from '../../../types/post/Post';
import {
    getAvailablePostsAction,
    setPostQueriesAction,
} from '../../actions/post';

interface Response {
    posts: Post[];
    totalPages: number;
}

export function* getAvailablePostsSaga(action: ActionType<typeof getAvailablePostsAction.request>) {
    try {
        const params = action.payload;
        const response: Response = params ? yield call(getAvailablePostsApi, params) : yield call(getAvailablePostsApi);
        const { posts, totalPages } = response;

        yield put(getAvailablePostsAction.success({ posts, totalPages }));

        if (params) {
            yield put(setPostQueriesAction(params));
        }

    } catch (e) {
        console.error(e);

        const error =
            'An error occurred while trying to download posts. Try again';

        yield put(getAvailablePostsAction.failure(error));
    }
}

export function* watchGetAvailablePostsSaga() {
    yield takeLatest(
        getType(getAvailablePostsAction.request),
        getAvailablePostsSaga,
    );
}

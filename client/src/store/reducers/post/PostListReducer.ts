import * as actions from '../../actions/post';
import {
    ActionType,
    createReducer,
} from 'typesafe-actions';
import { getInitialLoadingState } from '../../../common/utils';
import { Loading } from '../../../common/types/loading';
import { PostListState } from '../../../types/post/PostListState';
import { OrderDirection } from '../../../types/post/PostQueries';

type Actions = ActionType<typeof actions>;

const getInitialState = () => {
    return {
        loading: getInitialLoadingState(),
        values: [],
        queries: {
            search: '',
            page: 1,
            limit: 9,
            sort: '',
            order: OrderDirection.DESC,
            startDate: '',
            endDate: '',
        },
        totalPages: 0,
    };
};

export const PostListReducer = createReducer<PostListState, Actions>(
    getInitialState(),
)
    .handleAction([
        actions.getAvailablePostsAction.request,
        actions.deletePostAction.request,
    ], (state) => {
        return {
            ...state,
            loading: {
                status: Loading.REQUEST,
            },
        };
    })
    .handleAction(actions.getAvailablePostsAction.success, (state, action) => {
        return {
            ...state,
            loading: {
                status: Loading.SUCCESS,
            },
            values: action.payload.posts,
            totalPages: action.payload.totalPages,
        };
    })
    .handleAction(actions.deletePostAction.success, (state) => {
        return {
            ...state,
            loading: {
                status: Loading.SUCCESS,
            },
        };
    })
    .handleAction(actions.getAvailablePostsAction.failure, (state, action) => {
        return {
            ...state,
            loading: {
                status: Loading.FAILURE,
                info: action.payload,
            },
        };
    })
    .handleAction(actions.setPostQueriesAction, (state, action) => {
        return {
            ...state,
            queries: action.payload,
        };
    });

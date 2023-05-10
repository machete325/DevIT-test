import * as actions from '../../actions/post';
import {
    ActionType,
    createReducer,
} from 'typesafe-actions';
import { getInitialLoadingState } from '../../../common/utils';
import { PostInput } from '../../../types/post/PostInput';
import { PostEditorState } from '../../../types/post/PostEditorState';
import { Loading } from '../../../common/types/loading';

type Actions = ActionType<typeof actions>;

export const getInitialPostInput = (): PostInput => {
    return {
        title: '',
        creator: '',
        link: '',
        imgSrc: '',
        content: '',
        contentSnippet: '',
        categories: [],
        pubDate: '',
    };
};

const getInitialState = (): PostEditorState => {
    return {
        open: false,
        creation: false,
        loading: getInitialLoadingState(),
        values: getInitialPostInput(),
    };
};

export const PostEditorReducer = createReducer<PostEditorState, Actions>(
    getInitialState(),
)
    .handleAction(actions.openPostEditorAction, (state, action) => {
        return {
            ...state,
            open: true,
            creation: action.payload.creation,
            values: { ...action.payload.values },
        };
    })
    .handleAction(actions.savePostAction.request, (state) => {
        return {
            ...state,
            loading: {
                status: Loading.REQUEST,
            },
        };
    })
    .handleAction(
        [actions.savePostAction.success, actions.closePostEditorAction],
        () => {
            return getInitialState();
        },
    )
    .handleAction(actions.savePostAction.failure, (state) => {
        return {
            ...state,
            loading: {
                status: Loading.FAILURE,
            },
        };
    });

import { combineReducers } from 'redux';
import { PostEditorReducer } from './PostEditorReducer';
import { PostListReducer } from './PostListReducer';

export const PostReducer = combineReducers({
    list: PostListReducer,
    editor: PostEditorReducer,
});

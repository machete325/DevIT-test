import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import { AuthReducer } from './auth/AuthReducer';
import { AppReducer } from './app/AppReducer';
import { PostReducer } from './post/PostReducer';
import { UserReducer } from './user/UserReducer';

export const RootReducer = combineReducers({
    app: AppReducer,
    auth: AuthReducer,
    post: PostReducer,
    user: UserReducer,
});

export type RootState = StateType<typeof RootReducer>;

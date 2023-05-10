import { combineReducers } from 'redux';
import { LoginReducer } from './LoginReducer';

export const AuthReducer = combineReducers({
    login: LoginReducer,
});

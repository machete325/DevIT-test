import { combineReducers } from 'redux';
import { AppLoadingReducer } from './AppLoadingReducer';

export const AppReducer = combineReducers({
    loading: AppLoadingReducer,
});

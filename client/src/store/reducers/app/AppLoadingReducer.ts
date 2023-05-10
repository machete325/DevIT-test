import * as actions from '../../actions/app';
import {
    ActionType,
    createReducer,
} from 'typesafe-actions';
import { getInitialLoadingState } from '../../../common/utils';
import {
    Loading,
    LoadingState,
} from '../../../common/types/loading';

type Actions = ActionType<typeof actions>;
export const AppLoadingReducer = createReducer<LoadingState, Actions>(getInitialLoadingState())
    .handleAction(actions.initAppAction.request, (state) => {
        return {
            ...state,
            status: Loading.REQUEST,
        };
    })
    .handleAction(actions.initAppAction.success, (state) => {
        return {
            ...state,
            status: Loading.SUCCESS,
        };
    })
    .handleAction(actions.initAppAction.failure, (state, action) => {
        return {
            ...state,
            status: Loading.FAILURE,
            info: action.payload,
        };
    });

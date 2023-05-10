import * as actions from '../../actions/authActions';
import { loginAction } from '../../actions/authActions';
import {
    ActionType,
    createReducer,
} from 'typesafe-actions';
import { getInitialLoadingState } from '../../../common/utils';
import { LoginState } from '../../../types/authTypes';
import { Loading } from '../../../common/types/loading';

type Actions = ActionType<typeof actions>;

const getInitialState = () => {
    return {
        loading: getInitialLoadingState(),
        values: {
            email: '',
            password: '',
        },
    };
};

export const LoginReducer = createReducer<LoginState, Actions>(getInitialState())
    .handleAction(loginAction.request, (state) => {
        return {
            ...state,
            loading: {
                status: Loading.REQUEST,
            },
        };
    })
    .handleAction(loginAction.success, (state) => {
        return {
            ...state,
            loading: {
                status: Loading.SUCCESS,
            },
        };
    })
    .handleAction(loginAction.failure, (state) => {
        return {
            ...state,
            loading: {
                status: Loading.FAILURE,
            },
        };
    });

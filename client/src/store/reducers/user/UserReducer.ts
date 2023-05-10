import * as actions from '../../actions/user';
import {
    ActionType,
    createReducer,
} from 'typesafe-actions';
import { User } from '../../../types/users/User';

type Actions = ActionType<typeof actions>;

export const UserReducer = createReducer<User | null, Actions>(null)
    .handleAction(actions.getUserAction.success, (state, action) => {
        return action.payload;
    });

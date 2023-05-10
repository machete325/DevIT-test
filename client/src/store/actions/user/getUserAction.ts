import { createAsyncAction } from 'typesafe-actions';
import { User } from '../../../types/users/User';

export const getUserAction = createAsyncAction(
    'user/FETCH_REQUEST',
    'user/FETCH_SUCCESS',
    'user/FETCH_FAILURE',
)<void, User, void>();

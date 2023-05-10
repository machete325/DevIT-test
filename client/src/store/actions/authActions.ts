import { createAsyncAction } from 'typesafe-actions';
import { LoginInput } from '../../types/authTypes';

export const loginAction = createAsyncAction(
    'app/auth/LOGIN_REQUEST',
    'app/auth/LOGIN_SUCCESS',
    'app/auth/LOGIN_FAILURE',
)<LoginInput, void, void>();

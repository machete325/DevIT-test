import { createAsyncAction } from 'typesafe-actions';

export const initAppAction = createAsyncAction(
    'app/INIT_REQUEST',
    'app/INIT_SUCCESS',
    'app/INIT_FAILURE',
)<void, void, string>();

import { createAsyncAction } from 'typesafe-actions';

export const deletePostAction = createAsyncAction(
    'post/DELETE_REQUEST',
    'post/DELETE_SUCCESS',
    'post/DELETE_FAILURE',
)<number, void, void>();

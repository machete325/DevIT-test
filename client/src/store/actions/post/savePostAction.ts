import { createAsyncAction } from 'typesafe-actions';
import { PostInput } from '../../../types/post/PostInput';
import { Post } from '../../../types/post/Post';

export const savePostAction = createAsyncAction(
    'post/CREATE_REQUEST',
    'post/CREATE_SUCCESS',
    'post/CREATE_FAILURE',
)<PostInput, Post, void>();

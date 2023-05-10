import { createAsyncAction } from 'typesafe-actions';
import { Post } from '../../../types/post/Post';
import { PostQueries } from '../../../types/post/PostQueries';

interface Response {
    posts: Post[];
    totalPages: number;
}

export const getAvailablePostsAction = createAsyncAction(
    'post/posts/FETCH_REQUEST',
    'post/posts/FETCH_SUCCESS',
    'post/posts/FETCH_FAILURE',
)<void | PostQueries, Response, string>();

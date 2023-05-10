import { LoadingState } from '../../common/types/loading';
import { Post } from './Post';
import { PostQueries } from './PostQueries';

export interface PostListState {
    loading: LoadingState;
    values: Post[];
    queries: PostQueries;
    totalPages: number;
}

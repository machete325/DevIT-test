import { Post } from '../../types/post/Post';
import { rootApi } from '../rootApi';
import { PUBLIC_API } from '../../common/constants/urls';
import { PostQueries } from '../../types/post/PostQueries';

export async function getAvailablePostsApi(params?: PostQueries): Promise<Post[]> {
    const { data } = await rootApi.get(`${PUBLIC_API}/posts`, { params: { ...params } });

    return data;
}

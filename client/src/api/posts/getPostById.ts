import { Post } from '../../types/post/Post';
import { rootApi } from '../rootApi';
import { PUBLIC_API } from '../../common/constants/urls';

export async function getPostById(id: number): Promise<Post> {
    const { data } = await rootApi.get(`${PUBLIC_API}/posts/${id}`);

    return data;
}

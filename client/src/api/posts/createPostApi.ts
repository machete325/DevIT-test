import { Post } from '../../types/post/Post';
import { rootApi } from '../rootApi';
import { PUBLIC_API } from '../../common/constants/urls';
import { PostInput } from '../../types/post/PostInput';

export async function createPostApi(
    postInput: PostInput,
): Promise<Post> {
    const { data } = await rootApi.post(`${PUBLIC_API}/posts`, { ...postInput, pubDate: new Date().toISOString() });

    return data;
}

import { Post } from '../../types/post/Post';
import { rootApi } from '../rootApi';
import { PUBLIC_API } from '../../common/constants/urls';
import { PostInput } from '../../types/post/PostInput';

export async function editPostApi({ id, ...postInput }: PostInput): Promise<Post> {
    const { data } = await rootApi.put(`${PUBLIC_API}/posts/${id}`, postInput);

    return data;
}

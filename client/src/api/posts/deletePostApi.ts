import { rootApi } from '../rootApi';
import { PUBLIC_API } from '../../common/constants/urls';

export async function deletePostApi(id: number) {
    await rootApi.delete(`${PUBLIC_API}/posts/${id}`);
}

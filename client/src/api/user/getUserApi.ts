import { rootApi } from '../rootApi';
import { PUBLIC_API } from '../../common/constants/urls';
import { User } from '../../types/users/User';

export async function getUserApi(): Promise<User> {
    const { data } = await rootApi.get(`${PUBLIC_API}/users/me`);

    return data;
}

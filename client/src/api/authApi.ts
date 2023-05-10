import { AxiosResponse } from 'axios';
import { PUBLIC_API } from '../common/constants/urls';
import {
    AuthOutput,
    LoginInput,
} from '../types/authTypes';
import {
    getRefreshToken,
    setAccessToken,
    setRefreshToken,
} from '../utils/authUtils';
import { rootApi } from './rootApi';
import { HOME_ROUTE } from '../common/constants/routes';

export async function loginRequest(loginData: LoginInput) {
    const { data }: AxiosResponse<AuthOutput> = await rootApi.post(`${PUBLIC_API}/auth/login`, loginData);

    if (data) {
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
    }
}

export async function refreshTokenRequest() {
    const refreshToken = getRefreshToken();
    const { data }: AxiosResponse<AuthOutput> = await rootApi.post(`${PUBLIC_API}/auth/token/refresh`, { refreshToken });

    if (data) {
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
    }
}

export function logoutRequest() {
    setAccessToken(undefined);
    window.location.href = HOME_ROUTE;
}

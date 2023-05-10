import axios from 'axios';
import { ROOT } from '../common/constants/urls';
import {
    getAccessToken,
    setAccessToken,
    setRefreshToken,
} from '../utils/authUtils';
import { LOGIN_ROUTE } from '../common/constants/routes';
import { refreshTokenRequest } from './authApi';

export const rootApi = axios.create({
    baseURL: ROOT,
});

rootApi.interceptors.request.use((config) => {
    config.headers.set('Authorization', `Bearer ${getAccessToken()}`);

    return config;
});

rootApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.response?.status === 401) {
            return refreshTokenRequest()
                .then(() => (
                    rootApi.request(error.config)
                ))
                .catch(() => {
                    setAccessToken(undefined);
                    setRefreshToken(undefined);
                    window.location.href = LOGIN_ROUTE;
                });
        }

        return Promise.reject(error);
    },
);

axios.create();

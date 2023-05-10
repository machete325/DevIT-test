const ACCESS_TOKEN_KEY = 'access-token';
const REFRESH_TOKEN_KEY = 'refresh-token';

export function getAccessToken(): string | undefined {
    return localStorage.getItem(ACCESS_TOKEN_KEY) || undefined;
}

export function setAccessToken(token?: string) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token || '');
}

export function removeAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | undefined {
    return localStorage.getItem(REFRESH_TOKEN_KEY) || undefined;
}

export function setRefreshToken(token?: string) {
    localStorage.setItem(REFRESH_TOKEN_KEY, token || '');
}

export function removeRefreshToken() {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function getIsLoggedIn(): boolean {
    return !!getAccessToken();
}

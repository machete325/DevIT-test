export const ROOT = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : `${window.location.origin}`;
export const PUBLIC_API = '/api/v1/public';
export const SERVER_STATIC_ROOT = `${ROOT}/public`;

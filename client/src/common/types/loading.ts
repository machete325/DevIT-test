export enum Loading {
    IDLE = 'IDLE',
    REQUEST = 'REQUEST',
    SUCCESS = 'SUCCESS',
    FAILURE = 'FAILURE',
}

export interface LoadingState {
    status: Loading;
    info?: string;
}

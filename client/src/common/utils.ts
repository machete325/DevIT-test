import {
    isArray,
    isUndefined,
} from 'lodash';
import {
    Loading,
    LoadingState,
} from './types/loading';

export function arrayFrom<T>(value?: T | T[]): T[] {
    if (isUndefined(value)) {
        return [];
    }

    return isArray(value) ? value : [value];
}

export function getInitialLoadingState(status = Loading.IDLE): LoadingState {
    return { status };
}

export function inProgress(loading?: LoadingState): boolean {
    if (!loading) {
        return false;
    }

    return loading.status === Loading.REQUEST;
}

export function inProgressOrFailure(loading?: LoadingState): boolean {
    if (!loading) {
        return false;
    }

    return loading.status === Loading.REQUEST || loading.status === Loading.FAILURE;
}

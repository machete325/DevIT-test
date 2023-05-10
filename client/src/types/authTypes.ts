import { LoadingState } from '../common/types/loading';

export interface LoginInput {
    email: string;
    password: string;
}

export type AuthOutput = {
    accessToken: string,
    refreshToken: string,
};

export interface LoginState {
    loading: LoadingState;
    values: LoginInput;
}

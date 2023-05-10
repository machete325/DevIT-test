import {
    object,
    SchemaOf,
    string,
} from 'yup';
import {
    AuthOutput,
    LoginInput,
} from '../types/authTypes';

export const LoginInputSchema: SchemaOf<LoginInput> = object().shape({
    email: string()
        .label('Email')
        .email('Enter the correct email')
        .required('Required field'),
    password: string()
        .label('Password')
        .min(4, 'Password must contain at least 8 characters')
        .required('Required field'),
});

export const LoginResponseSchema: SchemaOf<AuthOutput> = object().shape({
    accessToken: string()
        .defined(),
    refreshToken: string()
        .defined(),
});

import { FormikProps } from 'formik';
import { ReactNode } from 'react';
import { SchemaOf } from 'yup';
import { LoadingState } from '../types/loading';

export interface LinkedMeta {
    error?: string;
    value: any;
    common: LabelInfo;
}

export interface LabelInfo {
    label?: ReactNode;
    required?: boolean;
}

export type FormContext<T> = FormikProps<T> & {
    validationSchema: SchemaOf<T>;
    loading?: LoadingState;
};

export interface BasicLinkedFieldProps {
    path: string;
    helperText?: ReactNode;
}

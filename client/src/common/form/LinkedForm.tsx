import {
    FormikValues,
    useFormik,
} from 'formik';
import React, {
    ReactElement,
    ReactNode,
} from 'react';
import { SchemaOf } from 'yup';
import { FormContext } from './types';
import { LoadingState } from '../types/loading';

export interface LinkedFormProps<T> {
    initialValues: FormikValues;
    validationSchema: SchemaOf<T>;
    onSubmit: (values: FormikValues) => void;
    children?: ReactNode;
    loading?: LoadingState;
    className?: string;
}

export const LinkedFormContext = React.createContext<FormContext<any>>(
    {} as any,
);

export const LinkedForm: <T>(
    props: LinkedFormProps<T>
) => ReactElement<LinkedFormProps<T>> = (props) => {
    const {
        initialValues,
        validationSchema,
        onSubmit,
        loading,
        children,
        className,
    } = props;

    const context = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
        validateOnChange: true,
        validateOnBlur: true,
        enableReinitialize: true,
    });

    return (
        <LinkedFormContext.Provider
            value={{ ...context, validationSchema, loading }}
        >
            <form onSubmit={context.handleSubmit}
                className={className}
            >
                {children}
            </form>
        </LinkedFormContext.Provider>
    );
};

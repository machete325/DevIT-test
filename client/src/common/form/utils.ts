import {
    get,
    isUndefined,
} from 'lodash';
import React from 'react';
import { reach } from 'yup';
import {
    FormContext,
    LabelInfo,
    LinkedMeta,
} from './types';

export function getLinkedMeta(
    context: FormContext<any>,
    path: string,
    overrides: LabelInfo,
): LinkedMeta {
    const { touched, errors } = context;

    let schema: any;
    let { label, required } = overrides;

    try {
        schema = reach(context.validationSchema, path);
    } catch (e: unknown) {
        schema = undefined;
    }

    if (schema) {
        if (isUndefined(label)) {
            label = schema.spec.label;
        }

        if (isUndefined(required)) {
            required = schema.spec.presence === 'required';
        }
    }

    return {
        error: (get(touched, path) && get(errors, path)) as string,
        value: get(context.values, path),
        common: {
            label,
            required,
        },
    };
}

export function getDivClientWidth(ref: React.RefObject<HTMLDivElement>) {
    return ref.current ? ref.current.clientWidth : undefined;
}

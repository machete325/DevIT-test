import React, { useContext } from 'react';
import { LinkedFormContext } from './LinkedForm';
import {
    BasicLinkedFieldProps,
    FormContext,
} from './types';
import { getLinkedMeta } from './utils';
import {
    TextField,
    TextFieldProps,
    Theme,
    useMediaQuery,
} from '@mui/material';
import { inProgress } from '../utils';

export type LinkedTextFieldProps = BasicLinkedFieldProps & Omit<TextFieldProps, 'onChange' | 'error' | 'value'> & {
    onChange?: (e: React.ChangeEvent<any>, context: FormContext<any>) => void;
};

export const LinkedTextField: React.FC<LinkedTextFieldProps> = (props) => {
    const { path, helperText, disabled, onChange, ...others } = props;
    const contextValue = useContext(LinkedFormContext);
    const { error, value, common } = getLinkedMeta(contextValue, path, others);
    const fullWidth = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));

    const handleChange = (e: React.ChangeEvent<any>, context: FormContext<any>) => {
        if (onChange) {
            onChange(e, context);

            return;
        }

        if (e.target.value === '') {
            context.setFieldValue(path, undefined);
        } else {
            context.handleChange(e);
        }
    };

    return (
        <TextField
            error={Boolean(error)}
            helperText={error || helperText || ' '}
            name={path}
            value={value || value === 0 ? value : ''}
            onChange={(e) => handleChange(e, contextValue)}
            variant="filled"
            style={{ marginTop: 5 }}
            size="small"
            fullWidth={fullWidth}
            disabled={inProgress(contextValue.loading) ? true : disabled}
            {...others}
            {...common}
        />
    );
};

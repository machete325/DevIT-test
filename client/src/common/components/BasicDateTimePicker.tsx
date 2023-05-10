import React from 'react';
import { TextField } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import {
    DateTimePicker,
    LocalizationProvider,
} from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import 'dayjs/locale/uk';

dayjs.locale('uk');

const useStyles = makeStyles()(() => ({
    datepicker: {
        width: '100%',
        maxWidth: 250,
    },
}));

interface Props {
    handleChange: (value: string | null, keyboardInputValue?: string | undefined) => void;
    label: string;
    value: string;
    path: string;
}

export const BasicDateTimePicker: React.FC<Props> = (props) => {
    const { handleChange, label, value, path } = props;
    const { classes } = useStyles();

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
                ampm={false}
                label={label}
                inputFormat="HH:mm DD/MM/YYYY"
                value={value || null}
                onChange={(newValue) => handleChange(newValue, path)}
                renderInput={(params) => (
                    <TextField
                        variant="filled"
                        style={{ marginTop: 5 }}
                        size="small"
                        {...params}
                    />
                )}
                className={classes.datepicker}
            />
        </LocalizationProvider>
    );
};

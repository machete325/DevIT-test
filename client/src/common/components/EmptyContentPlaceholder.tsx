import {
    Box,
    Typography,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import React from 'react';

const useStyles = makeStyles()(({ spacing }) => ({
    wrapper: {
        width: '100%',
        height: '100%',
        maxWidth: 400,
        margin: '0 auto',
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#aaa',
        textAlign: 'center',
        marginTop: spacing(2),
        marginBottom: spacing(7),
    },
}));

interface Props {
    text: React.ReactNode;
}

export const EmptyContentPlaceholder = (props: Props) => {
    const { text } = props;
    const { classes } = useStyles();

    return (
        <Box className={classes.wrapper}>
            <Typography className={classes.text}>{text}</Typography>
        </Box>
    );
};

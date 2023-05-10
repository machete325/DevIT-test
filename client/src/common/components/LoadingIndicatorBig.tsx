import React from 'react';
import { ErrorRounded } from '@mui/icons-material';
import {
    Box,
    Button,
    CircularProgress,
    Paper,
    Typography,
} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { LoadingState } from '../types/loading';
import { inProgressOrFailure } from '../utils';

const useStyles = makeStyles()(({ spacing }) => ({
    loadingPaper: {
        width: 300,
        height: 300,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        '& .MuiTypography-root': {
            marginTop: spacing(3.5),
            marginBottom: spacing(2),
        },
        '& svg': {
            fontSize: '50px',
        },
    },
}));

interface Props {
    loading?: LoadingState;
    onRefresh?: VoidFunction;
    children?: React.ReactNode;
}

export const LoadingIndicatorBig = (props: Props) => {
    const { loading, onRefresh, children } = props;
    const { classes } = useStyles();

    return (
        <React.Fragment>
            {
                inProgressOrFailure(loading)
                    ? loading?.info
                        ? (
                            <Paper elevation={0}
                                className={classes.loadingPaper}
                            >
                                <ErrorRounded />

                                <Typography>{loading.info}</Typography>

                                <Button
                                    color='primary'
                                    variant='contained'
                                    onClick={onRefresh}
                                >
                                    Try one more
                                </Button>
                            </Paper>
                        )
                        : (
                            <Box display='flex'
                                justifyContent='center'
                                alignItems='center'
                                width='100%'
                                height='100%'
                            >
                                <CircularProgress />
                            </Box>
                        )
                    : children
            }
        </React.Fragment>
    );
};

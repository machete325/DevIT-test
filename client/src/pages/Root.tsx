import React, { useCallback, useEffect } from 'react';
import { Header } from '../common/components/Header';
import { Page } from '../common/components/Page';
import { makeStyles } from 'tss-react/mui';
import {
    Box,
    Paper,
} from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { appSelector } from '../store/selectors/app/appSelector';
import { initAppAction } from '../store/actions';
import { LoadingIndicatorBig } from '../common/components/LoadingIndicatorBig';

const useStyles = makeStyles()(() => ({
    content: {
        flex: 1,
        width: '100%',
    },
}));

export const Root = () => {
    const { classes } = useStyles();

    const dispatch = useDispatch();
    const { loading } = useSelector(appSelector);

    const initRequest = useCallback(() => {
        dispatch(initAppAction.request());
    }, [dispatch]);

    useEffect(() => {
        initRequest();
    }, [initRequest]);

    return (
        <LoadingIndicatorBig
            loading={loading}
            onRefresh={initRequest}
        >
            <Page>
                <Header />

                <Box
                    display='flex'
                    flex={1}
                >

                    <Paper
                        elevation={0}
                        className={classes.content}
                    >
                        <Outlet />
                    </Paper>
                </Box>
            </Page>
        </LoadingIndicatorBig>
    );
};

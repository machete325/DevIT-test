import React, { useCallback } from 'react';
import {
    Box,
    Button,
    CircularProgress,
    Paper,
    Typography,
} from '@mui/material';
import { LinkedForm } from '../common/form/LinkedForm';
import { LoginInputSchema } from '../schemas/AuthSchemas';
import { LinkedTextField } from '../common/form/LinkedTextField';
import { LoginInput } from '../types/authTypes';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import { loginAction } from '../store/actions';
import { makeStyles } from 'tss-react/mui';
import { loginSelector } from '../store/selectors/auth/loginSelector';
import { inProgress } from '../common/utils';

const useStyles = makeStyles()(({ spacing }) => ({
    wrapper: {
        width: '100',
        height: '100%',
        padding: spacing(4),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paper: {
        width: 450,
        padding: spacing(4),
    },
    title: {
        marginBottom: spacing(2),
    },
}));

export const LoginPage = () => {
    const { classes } = useStyles();
    const dispatch = useDispatch();
    const { loading, values } = useSelector(loginSelector);

    const handleSubmit = useCallback((loginInput: LoginInput) => {
        dispatch(loginAction.request(loginInput));
    }, [dispatch]);

    return (
        <Box className={classes.wrapper}>
            <Paper
                elevation={5}
                className={classes.paper}
            >
                <LinkedForm
                    initialValues={values}
                    validationSchema={LoginInputSchema}
                    onSubmit={handleSubmit}
                    loading={loading}
                >
                    <Typography
                        variant='h5'
                        className={classes.title}
                    >
                        Login to DevIT test
                    </Typography>

                    <LinkedTextField
                        path={'email'}
                        fullWidth
                    />

                    <LinkedTextField
                        path={'password'}
                        type='password'
                        fullWidth
                    />

                    <Box
                        display='flex'
                        justifyContent='flex-end'
                        height={45}
                    >
                        {inProgress(loading)
                            ? <CircularProgress/>
                            : (
                                <Button
                                    type='submit'
                                    variant='contained'
                                    color='primary'
                                    size='large'
                                >
                                    Login
                                </Button>
                            )
                        }
                    </Box>
                </LinkedForm>
            </Paper>
        </Box>
    );
};

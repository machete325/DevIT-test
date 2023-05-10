import {
    Box,
    Button,
    Divider,
    Drawer,
    Typography,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { makeStyles } from 'tss-react/mui';
import {
    LinkedForm,
    LinkedFormProps,
} from '../form/LinkedForm';
import { LoadingIndicatorBig } from './LoadingIndicatorBig';

const useStyles = makeStyles()(({ spacing }) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        height: '100%',
    },
    content: {
        padding: spacing(3),
        flex: 1,
        height: '100%',
        overflow: 'auto',
    },
    titleBox: {
        marginBottom: spacing(1),
    },
    title: {
        marginBottom: spacing(1),
    },
    paper: {
        borderRadius: '4px 0 0 4px',
        width: 600,
        height: '100%',
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: spacing(2),
    },
    button: {
        width: 100,
    }
}));

interface Props<T> extends LinkedFormProps<T> {
    open: boolean;
    title: React.ReactNode;
    description?: React.ReactNode;
    onClose: VoidFunction;
    submitActionTitle?: React.ReactNode;
    cancelActionTitle?: React.ReactNode;
    children: React.ReactNode;
}

export const BaseEditor: <T>(props: Props<T>) => ReactElement<Props<T>> = (props) => {
    const {
        open,
        title,
        description,
        onClose,
        submitActionTitle = 'Save',
        cancelActionTitle = 'Cancel',
        children,
        loading,
        ...others
    } = props;
    const { classes } = useStyles();

    return (
        <Drawer
            anchor='right'
            open={open}
            onClose={onClose}
            PaperProps={{
                className: classes.paper,
            }}
        >
            <LinkedForm
                {...others}
                className={classes.form}
            >
                <LoadingIndicatorBig loading={loading}>
                    <Box className={classes.content}>
                        <Box className={classes.titleBox}>
                            <Typography
                                variant='h2'
                                className={classes.title}
                            >
                                {title}
                            </Typography>

                            <Typography variant='caption'>{description}</Typography>
                        </Box>

                        {children}
                    </Box>

                    <Divider />

                    <Box className={classes.actions}>
                        <Button
                            onClick={onClose}
                            className={classes.button}
                        >
                            {cancelActionTitle}
                        </Button>

                        <Button
                            type='submit'
                            variant='contained'
                            className={classes.button}
                        >
                            {submitActionTitle}
                        </Button>
                    </Box>
                </LoadingIndicatorBig>
            </LinkedForm>
        </Drawer>
    );
};

import React, { ReactNode } from 'react';
import { Box } from '@mui/system';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(({ spacing }) => ({
    wrapper: {
        padding: spacing(0, 1),
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
}));

interface Props {
    children: ReactNode;
}

export const Page = ({ children }: Props) => {
    const { classes, cx } = useStyles();

    return <Box className={cx(classes.wrapper)}>{children}</Box>;
};

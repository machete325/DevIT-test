import { Grid } from '@mui/material';
import React, { Children } from 'react';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(({ spacing }) => ({
    gridItem: {
        padding: spacing(2),
    },
}));

interface Props {
    children: React.ReactNode;
}

export const ListDataGrid = (props: Props) => {
    const { classes } = useStyles();
    const { children } = props;
    const childrenArray = Children.toArray(children);

    return (
        <Grid container>
            {Children.map(childrenArray, (child, index) => (
                <Grid
                    item
                    key={index}
                    className={classes.gridItem}
                    xs={12}
                    sm={12}
                    md={6}
                    lg={4}
                    xl={4}
                >
                    {child}
                </Grid>
            ))}
        </Grid>
    );
};

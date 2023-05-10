import React from 'react';
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { makeStyles } from 'tss-react/mui';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import { postQueriesSelector } from '../../store/selectors/post/postQueriesSelector';
import {
    OrderDirection,
    SortType,
} from '../../types/post/PostQueries';
import {
    getAvailablePostsAction,
    setPostQueriesAction,
} from '../../store/actions';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { BasicDateTimePicker } from './BasicDateTimePicker';

const useStyles = makeStyles()(({ spacing, palette }) => ({
    topContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: `1px solid ${palette.divider}`,
        padding: spacing(2, 4),
    },
    container: {
        display: 'flex',
        alignItems: 'center',
    },
    datePickerContainer: {
        display: 'flex',
        alignItems: 'center',
        columnGap: 12,
    },
    filterButton: {
        height: 40,
    },
}));

interface Props {
    title: string;
    addBtnTitle: string;
    onCreate: VoidFunction;
}

export const FeatureHeader = (props: Props) => {
    const { title, addBtnTitle, onCreate } = props;
    const dispatch = useDispatch();
    const { classes } = useStyles();
    const postQueries = useSelector(postQueriesSelector);
    const { startDate, endDate } = postQueries;

    const handleChange = (event: SelectChangeEvent) => {
        return dispatch(getAvailablePostsAction.request({ ...postQueries, sort: event.target.value }));
    };

    const onChangeOrder = () => {
        if (postQueries.order === OrderDirection.ASC) {
            return dispatch(getAvailablePostsAction.request({ ...postQueries, order: OrderDirection.DESC }));
        }

        return dispatch(getAvailablePostsAction.request({ ...postQueries, order: OrderDirection.ASC }));
    };

    const handleSetDate = (value: string, path: string) => {
        dispatch(setPostQueriesAction({ ...postQueries, [path]: value }));
    };

    const onApplyFilter = () => {
        return dispatch(getAvailablePostsAction.request({ ...postQueries, startDate, endDate }));
    };

    return (
        <Box className={classes.topContainer}>
            <Box className={classes.container}>
                <Typography variant='h4'>{title}</Typography>
                <FormControl sx={{ ml: 2, minWidth: 200 }}
                    size="small"
                >
                    <InputLabel id="group-by">Group By</InputLabel>
                    <Select
                        labelId="group-by"
                        id="group-by"
                        value={postQueries.sort}
                        label="Group By"
                        onChange={handleChange}
                    >
                        <MenuItem value={SortType.CREATOR}>Author</MenuItem>
                        <MenuItem value={SortType.PUB_DATE}>Publish Date</MenuItem>
                    </Select>
                </FormControl>
                <Button onClick={onChangeOrder}
                    sx={{ ml: 2 }}
                >
                    <SwapVertIcon sx={{ color: postQueries.order === OrderDirection.DESC ? 'black' : 'rgb(0 141 255)' }}/>
                </Button>
                <Box className={classes.datePickerContainer}>
                    <BasicDateTimePicker
                        path='startDate'
                        handleChange={handleSetDate}
                        value={postQueries.startDate}
                        label='startDate'
                    />
                    <BasicDateTimePicker
                        path='endDate'
                        handleChange={handleSetDate}
                        value={postQueries.endDate}
                        label='endDate'
                    />
                    <Button
                        className={classes.filterButton}
                        variant='contained'
                        disabled={!(Date.parse(startDate) && Date.parse(endDate))}
                        onClick={onApplyFilter}
                    >
                        Apply
                    </Button>
                </Box>
            </Box>

            <Button
                onClick={onCreate}
                startIcon={<AddRoundedIcon/>}
                variant="outlined"
                size="large"
            >
                {addBtnTitle}
            </Button>
        </Box>
    );
};

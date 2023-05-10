import React from 'react';
import Pagination from '@mui/material/Pagination';
import { Box } from '@mui/material';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import { postTotalPagesSelector } from '../../../store/selectors/post/postTotalPagesSelector';
import { postQueriesSelector } from '../../../store/selectors/post/postQueriesSelector';
import { getAvailablePostsAction } from '../../../store/actions';

export const PostPagination = () => {
    const dispatch = useDispatch();
    const totalPages = useSelector(postTotalPagesSelector);
    const postQueries = useSelector(postQueriesSelector);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        return dispatch(getAvailablePostsAction.request({ ...postQueries, page: value }));
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination count={totalPages}
                page={postQueries.page}
                onChange={handleChange}
                color="primary"
            />
        </Box>
    );
};

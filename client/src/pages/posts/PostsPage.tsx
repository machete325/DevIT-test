import React, {
    useCallback,
    useEffect,
} from 'react';
import { Box } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../../types/post/Post';
import { postListSelector } from '../../store/selectors/post/postListSelector';
import {
    getAvailablePostsAction,
    openPostEditorAction,
} from '../../store/actions/post';
import { getInitialPostInput } from '../../store/reducers/post/PostEditorReducer';
import { LoadingIndicatorBig } from '../../common/components/LoadingIndicatorBig';
import { PostCard } from './components/PostCard';
import { PostEditor } from './components/editor/PostEditor';
import { EmptyContentPlaceholder } from '../../common/components/EmptyContentPlaceholder';
import { ListDataGrid } from '../../common/components/ListDataGrid';
import { FeatureHeader } from '../../common/components/FeatureHeader';
import { PostPagination } from './components/PostPagination';
import { isEmpty } from 'lodash';

const useStyles = makeStyles()(({ spacing }) => ({
    wrapper: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: spacing(0, 0, 2),
    },
    postsContainer: {
        display: 'flex',
        padding: spacing(3),
        height: '100%',
    },
}));

export const PostsPage = () => {
    const { classes } = useStyles();
    const dispatch = useDispatch();

    const { values, loading } = useSelector(postListSelector);

    const handleCreate = useCallback(() => {
        dispatch(openPostEditorAction({
            creation: true,
            values: getInitialPostInput(),
        }));
    }, [dispatch]);

    const handleInit = useCallback(() => {
        dispatch(getAvailablePostsAction.request());
    }, [dispatch]);

    useEffect(() => {
        handleInit();
    }, [handleInit]);


    return (
        <Box className={classes.wrapper}>
            <LoadingIndicatorBig
                loading={loading}
                onRefresh={handleInit}
            >
                <FeatureHeader
                    title='Posts'
                    addBtnTitle='Add post'
                    onCreate={handleCreate}
                />

                {isEmpty(values)
                    ? (
                        <Box className={classes.postsContainer}>
                            <EmptyContentPlaceholder
                                text='There are no such posts'
                            />
                        </Box>
                    )
                    : (
                        <ListDataGrid>
                            {values.map((post: Post) => (
                                <PostCard
                                    key={post.id}
                                    {...post}
                                />
                            ))}
                        </ListDataGrid>
                    )
                }

                <PostPagination />
            </LoadingIndicatorBig>

            <PostEditor />
        </Box>
    );
};

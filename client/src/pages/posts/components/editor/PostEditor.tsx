import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postEditorSelector } from '../../../../store/selectors/post/postEditorSelector';
import {
    closePostEditorAction,
    savePostAction,
} from '../../../../store/actions/post';
import { PostInput } from '../../../../types/post/PostInput';
import { BaseEditor } from '../../../../common/components/BaseEditor';
import { PostInputSchema } from '../../../../schemas/PostInputSchema';
import { LinkedTextField } from '../../../../common/form/LinkedTextField';

export const PostEditor = () => {
    const dispatch = useDispatch();
    const { loading, open, creation, values } = useSelector(postEditorSelector);

    const handleClose = useCallback(() => {
        dispatch(closePostEditorAction());
    }, [dispatch]);

    const handleSubmit = useCallback((postInput: PostInput) => {
        dispatch(savePostAction.request(postInput));
    }, [dispatch]);

    return (
        <BaseEditor
            initialValues={values}
            validationSchema={PostInputSchema}
            onSubmit={handleSubmit}
            loading={loading}
            open={open}
            onClose={handleClose}
            title={creation ? 'Create new post' : 'Edit post'}
        >
            <LinkedTextField
                path='title'
                fullWidth
            />

            <LinkedTextField
                path='imgSrc'
                fullWidth
            />

            <LinkedTextField
                path='content'
                fullWidth
            />
        </BaseEditor >
    );
};

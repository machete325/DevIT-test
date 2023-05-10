import { createAction } from 'typesafe-actions';

export const closePostEditorAction = createAction(
    'post/editor/CLOSE',
)<void>();

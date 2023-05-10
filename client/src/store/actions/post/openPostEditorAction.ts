import { createAction } from 'typesafe-actions';
import { OpenPostEditorActionInput } from '../../../types/post/OpenPostEditorActionInput';

export const openPostEditorAction = createAction(
    'post/editor/OPEN',
)<OpenPostEditorActionInput>();

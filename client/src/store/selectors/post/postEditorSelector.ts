import { createSelector } from 'reselect';
import { postSelector } from './postSelector';

export const postEditorSelector = createSelector(postSelector, ({ editor }) => editor);

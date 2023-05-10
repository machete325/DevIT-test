import { createSelector } from 'reselect';
import { postSelector } from './postSelector';

export const postListSelector = createSelector(postSelector, ({ list }) => list);

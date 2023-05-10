import { createSelector } from 'reselect';
import { postSelector } from './postSelector';

export const postTotalPagesSelector = createSelector(postSelector, ({ list: { totalPages } }) => totalPages);

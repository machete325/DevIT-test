import { createSelector } from 'reselect';
import { postSelector } from './postSelector';

export const postQueriesSelector = createSelector(postSelector, ({ list: { queries } }) => queries);

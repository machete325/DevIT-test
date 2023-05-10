import { createSelector } from 'reselect';
import { rootSelector } from '../rootSelector';

export const postSelector = createSelector(rootSelector, ({ post }) => post);

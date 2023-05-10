import { createSelector } from 'reselect';
import { rootSelector } from '../rootSelector';

export const authSelector = createSelector(rootSelector, ({ auth }) => auth);

import { createSelector } from 'reselect';
import { rootSelector } from '../rootSelector';

export const userSelector = createSelector(rootSelector, ({ user }) => user);

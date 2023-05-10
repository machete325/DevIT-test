import { createSelector } from 'reselect';
import { authSelector } from './authSelector';

export const loginSelector = createSelector(authSelector, ({ login }) => login);

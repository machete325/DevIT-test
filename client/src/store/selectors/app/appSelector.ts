import { createSelector } from 'reselect';
import { rootSelector } from '../rootSelector';

export const appSelector = createSelector(rootSelector, ({ app }) => app);

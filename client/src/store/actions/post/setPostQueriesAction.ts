import { createAction } from 'typesafe-actions';
import { PostQueries } from '../../../types/post/PostQueries';

export const setPostQueriesAction = createAction(
  'post/queries/SET',
)<PostQueries>();

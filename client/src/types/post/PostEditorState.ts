import { LoadingState } from '../../common/types/loading';
import { PostInput } from './PostInput';

export interface PostEditorState {
    open: boolean;
    creation: boolean;
    loading: LoadingState;
    values: PostInput;
}

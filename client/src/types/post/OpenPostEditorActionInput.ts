import { PostInput } from './PostInput';

export interface OpenPostEditorActionInput {
    creation: boolean;
    values: PostInput;
}

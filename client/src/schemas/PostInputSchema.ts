import {
    array,
    number,
    object,
    SchemaOf,
    string,
} from 'yup';
import { PostInput } from '../types/post/PostInput';

export const PostInputSchema: SchemaOf<PostInput> = object().shape({
    id: number()
        .optional(),
    title: string()
        .label('Title')
        .required('Required field'),
    creator: string()
        .label('Author')
        .optional(),
    link: string()
        .label('Link')
        .optional(),
    imgSrc: string()
        .label('Image Link')
        .required('Required field'),
    content: string()
        .label('Content')
        .required('Required field'),
    contentSnippet: string()
        .label('Content Snippet')
        .optional(),
    categories: array()
        .label('Categories')
        .default([]),
    pubDate: string()
        .label('Pub Date')
        .optional(),
});

export interface PostInput {
    id?: number;
    title: string;
    creator?: string;
    link?: string;
    imgSrc: string;
    content: string;
    contentSnippet?: string;
    categories: string[] | [];
    pubDate?: string;
}

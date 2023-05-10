export interface Post {
    id: number;
    title: string;
    creator: string;
    imgSrc: string;
    link: string;
    content: string;
    contentSnippet: string;
    categories: string[];
    pubDate: Date;
}
export interface UpdatePostDto {
    title: string;
    link: string;
    imgSrc: string;
    content: string;
    contentSnippet: string;
    categories: string[];
    pubDate?: Date;
}

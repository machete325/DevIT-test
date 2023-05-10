import { Post } from '../types/post.type';

export function convertToPost(model: Post): Post {

    return {
        id: model.id,
        title: model.title,
        creator: model.creator,
        link: model.link,
        imgSrc: model.imgSrc,
        content: model.content,
        contentSnippet: model.contentSnippet,
        categories: model.categories,
        pubDate: model.pubDate,
    };
}

export function convertToPosts(posts: Post[]): Post[] {
    return posts.map((post) => convertToPost(post));
}

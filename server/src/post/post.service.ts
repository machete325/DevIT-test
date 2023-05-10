import { PrismaService } from 'nestjs-prisma';
import {
    BadRequestException,
    Injectable,
    Logger,
} from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import { convertToPosts } from './converter/to-post.converter';
import { UpdatePostDto } from './dto/update-post.dto';
import { Cron } from '@nestjs/schedule';
import * as Parser from 'rss-parser';
import { SortType } from './types/SortType';
import { getImageSrc } from './utils/getImageSrc';
import { OrderDirection } from 'src/common/order/order-direction';

interface Params {
    page: number;
    limit: number;
    sort?: SortType;
    order?: OrderDirection;
    search?: string;
    startDate?: Date;
    endDate?: Date;
}

@Injectable()
export class PostService {
    constructor(private readonly prisma: PrismaService) { }
    private readonly logger = new Logger(PostService.name);

    async getAvailablePosts(params: Params) {
        try {
            const { page, limit, sort, order, search, startDate, endDate } = params;

            const skip = (page - 1) * limit;
            const take = limit;

            const filter = (startDate && endDate) ? {
                AND: [
                    {
                        pubDate: {
                            gte: startDate,
                        },
                    },
                    {
                        pubDate: {
                            lte: endDate,
                        },
                    },
                ],
            } : null;

            const posts = await this.prisma.posts.findMany({
                where: {
                    AND: [
                        {
                            OR: [
                                { title: { contains: search, mode: 'insensitive' } },
                                { creator: { contains: search, mode: 'insensitive' } },
                            ],
                        },
                        filter,
                    ],
                },
                orderBy: {
                    [SortType[sort] || 'pubDate']: OrderDirection[order] || 'desc',
                },
                take,
                skip,
            });

            const allPosts = await this.prisma.posts.findMany({
                where: {
                    AND: [
                        {
                            OR: [
                                { title: { contains: search, mode: 'insensitive' } },
                                { creator: { contains: search, mode: 'insensitive' } },
                            ],
                        },
                        filter,
                    ],
                },
            });

            const totalPages = Math.ceil(allPosts.length / limit);

            return { posts: convertToPosts(posts), totalPages };
        } catch (e) {
            console.log(e);

            throw new BadRequestException('Fail during get the list of posts');
        }
    }

    async createPost(post: PostDto) {
        try {

            await this.prisma.posts.create({
                data: { ...post },
            });
        } catch (e) {
            console.log(e);

            throw new BadRequestException('Fail during creation of post');
        }
    }

    async updatePost(id: number, post: UpdatePostDto) {
        try {
            await this.prisma.posts.update({
                data: post,
                where: {
                    id,
                },
            });
        } catch (e) {
            console.log(e);

            throw new BadRequestException('Fail during updating of post');
        }
    }

    async deletePost(postId: number) {
        try {
            await this.prisma.posts.delete({
                where: {
                    id: postId,
                },
            });
        } catch (e) {
            console.log(e);

            throw new BadRequestException('Fail during deleting of post');
        }
    }

    async isExistPost(link: string) {
        try {
            const post = await this.prisma.posts.findFirst({
                where: {
                    link,
                },
            });

            return post;

        } catch (e) {
            console.log(e);

            throw new BadRequestException('Fail during deleting of post');
        }
    }

    async parsingPosts() {
        try {
            const parser = new Parser();
            const posts = await parser.parseURL('https://lifehacker.com/rss');

            for (const post of posts.items) {

                const { title, creator, link, content: rawContent, contentSnippet, categories, pubDate } = post;

                const isExist = await this.isExistPost(post.link);

                const imgSrc = getImageSrc(rawContent);
                const content = rawContent.replace(/<img[^>]+>/g, '');

                const data = {
                    title,
                    creator,
                    link,
                    imgSrc,
                    content,
                    contentSnippet,
                    categories,
                    pubDate: new Date(pubDate),
                };

                if (!isExist) {
                    await this.createPost(data);
                }
            }

        } catch (e) {
            console.log(e);
        }
    }

    @Cron('0 0 * * * *') // Launch cron every hour
    handleCron() {
        this.logger.debug('Parsing posts...');
        this.parsingPosts();
    }

}

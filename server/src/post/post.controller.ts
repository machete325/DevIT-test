import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Query,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PostInput } from './dto/post.input';
import { PostsOutput } from './dto/posts.output';
import { PostService } from './post.service';
import { UpdatePostInput } from './dto/update-post.input';
import { SortType } from './types/SortType';
import { User } from 'src/users/decorators/user.decorator';
import { UserOutput } from 'src/users/dto/user.output';
import { OrderDirection } from 'src/common/order/order-direction';

@ApiTags('Posts')
@Controller('api/v1/public/posts')
export class PostController {
    constructor(private readonly postService: PostService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async getAvailablePosts(
        @Query('search') search: string,
        @Query('page') page: string,
        @Query('limit') limit: string,
        @Query('sort') sort: SortType,
        @Query('order') order: OrderDirection,
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
    ): Promise<PostsOutput> {
        const params = {
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 9,
            sort,
            order,
            search,
            startDate: startDate && new Date(startDate),
            endDate: endDate && new Date(endDate),
        };

        const result = await this.postService.getAvailablePosts(params);

        return result;
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async createPost(
        @User() user: UserOutput,
        @Body(new ValidationPipe()) postInput: PostInput,
    ) {
        const creator = `${user.firstName} ${user.lastName}`;

        return this.postService.createPost({ ...postInput, creator });
    }

    @Put('/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async updatePost(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe()) updatePostInput: UpdatePostInput,
    ) {

        return this.postService.updatePost(id, updatePostInput);
    }

    @Delete('/:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async deletePost(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<void> {

        await this.postService.deletePost(id);
    }
}

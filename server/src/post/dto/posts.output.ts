import { ApiProperty } from '@nestjs/swagger';
import { PostOutput } from './post.output';

export class PostsOutput {
  @ApiProperty({ type: [PostOutput] })
  posts: PostOutput[];
  totalPages: number;
}

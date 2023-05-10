import { ApiProperty } from '@nestjs/swagger';

export class PostOutput {
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  creator: string;
  @ApiProperty()
  link: string;
  @ApiProperty()
  imgSrc: string;
  @ApiProperty()
  content: string;
  @ApiProperty()
  contentSnippet: string;
  @ApiProperty()
  categories: string[];
  @ApiProperty()
  pubDate: Date;
}



import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class PostInput {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;
  @IsString()
  @ApiProperty()
  creator: string;
  @IsString()
  @ApiProperty()
  link: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  imgSrc: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  content: string;
  @IsString()
  @ApiProperty()
  contentSnippet: string;
  @IsNotEmpty()
  @IsArray()
  @ApiProperty()
  categories: string[];
  @IsNotEmpty()
  @ApiProperty()
  @Transform(({ value }) => value && new Date(value))
  pubDate: Date;
}
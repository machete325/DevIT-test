import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
    IsNotEmpty,
    IsString,
} from 'class-validator';

export class UpdatePostInput {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;
  @IsNotEmpty()
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
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  contentSnippet: string;
  @IsNotEmpty()
  @IsArray()
  @ApiProperty()
  categories: string[];
}

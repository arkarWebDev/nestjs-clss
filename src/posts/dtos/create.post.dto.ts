import {
  IsArray,
  IsEnum,
  IsInt,
  isInt,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { postStatus } from '../enums/postStatus.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateTagDto } from 'src/tags/dtos/create-tag.dto';
import { Type } from 'class-transformer';
import { CreatePostMetaDto } from 'src/post-meta/dtos/create-post-meta.dto';

/**
 * DTO for creating a new blog post
 */
export class CreatePostDto {
  /** Title of the blog post (min 5 characters) */
  @ApiProperty({
    description: 'This is the title of blog post',
    example: 'Test title',
  })
  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  title!: string;

  /** URL-friendly slug for the post (lowercase, hyphens only) */
  @ApiProperty({
    description: 'This is the slug of blog post',
    example: 'test-title',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'Slug must be all small letters and users only "-" and without spaces.',
  })
  slug!: string;

  /** Publication status of the post */
  @ApiProperty({
    description: 'Values must be "draft", "scheduled", "published"',
    enum: postStatus,
  })
  @IsEnum(postStatus)
  @IsNotEmpty()
  status!: postStatus;

  /** Main body content of the blog post */
  @ApiProperty({
    description: 'This is the content of blog post',
    example: 'Test post content',
  })
  @IsString()
  @IsNotEmpty()
  content!: string;

  /** Optional URL for the post's feature image */
  @ApiPropertyOptional({
    description: 'This is the feature image of blog post',
    example: 'https://codehubmm.com/images/logo.png',
  })
  @IsUrl()
  @IsOptional()
  featureImgUrl?: string;

  /** Optional ISO8601 date string for scheduled or published time */
  @ApiPropertyOptional({
    description: 'This is the date of blog post scheduled or published time',
    example: '2026-04-29T14:30:00.000Z',
  })
  @IsISO8601()
  @IsOptional()
  publishOn?: string;

  /** Optional array of tag strings (each min 2 characters) */
  @ApiPropertyOptional({
    description: 'Array of tag ids for blog post',
    example: [1, 2, 3],
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tags?: number[];

  /** Required post meta (e.g. readTime) */
  @ApiProperty({
    description: 'Meta options for the post',
    type: CreatePostMetaDto,
  })
  @ValidateNested()
  @Type(() => CreatePostMetaDto)
  @IsNotEmpty()
  meta!: CreatePostMetaDto;

  /** Required post author id */
  @ApiProperty({
    description: 'Author id for the post',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  authorId!: number;
}

import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MinLength,
} from 'class-validator';
import { postStatus } from '../enums/postStatus.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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
    description: 'Array of tags for blog post',
    example: '["ai","test"]',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MinLength(2, { each: true })
  tags?: string[];
}

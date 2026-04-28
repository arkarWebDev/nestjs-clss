import { CreatePostDto } from './create.post.dto';
import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

/**
 * DTO for partially updating an existing post (PATCH). Extends CreatePostDto with all fields optional.
 */
export class PatchPostDto extends PartialType(CreatePostDto) {
  /**
   * The unique numeric ID of the post to update
   */
  @ApiProperty({
    description: 'ID of the post that want to updated',
  })
  @IsInt()
  @IsNotEmpty()
  id!: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

/**
 * DTO for fetching a single user by ID from route params
 */
export class GetUserDto {
  /**
   * The unique numeric ID of the user
   */
  @ApiProperty({
    description: 'Get user info with specific id',
    example: 1234,
  })
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  id!: number;
}

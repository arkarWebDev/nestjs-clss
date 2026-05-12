import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTagDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  @MaxLength(256)
  label!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;
}

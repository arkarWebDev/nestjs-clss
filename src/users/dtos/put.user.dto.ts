import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create.user.dto';

/**
 * DTO for full user update (PUT). All fields from CreateUserDto are optional.
 */
export class PutUserDto extends PartialType(CreateUserDto) {}

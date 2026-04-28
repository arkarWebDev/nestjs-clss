import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

/**
 * DTO for creating a new user
 */
export class CreateUserDto {
  /** User's first name (min 3 characters) */
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  firstName!: string;

  /** User's last name (optional, min 3 characters) */
  @IsString()
  @IsOptional()
  @MinLength(3)
  lastName?: string;

  /** User's email address */
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  /** User's password (min 8 chars, must include upper/lowercase, number, special char) */
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Minimum 8 characters, at least 1 uppercase, 1 lowercase, 1 number, and 1 special character for password',
    },
  )
  password!: string;
}

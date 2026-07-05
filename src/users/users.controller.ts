import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create.user.dto';
import { GetUserDto } from './dtos/get.user.dto';
import { PutUserDto } from './dtos/put.user.dto';
import { UsersService } from './providers/users.service';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreateManyUsersDto } from './dtos/create-many-users.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type-enum';

/**
 * Controller to handle HTTP requests for the users resource
 */
@Controller('users')
export class UsersController {
  /**
   * @param usersService - Injected UsersService for user business logic
   */
  constructor(private readonly usersService: UsersService) {}

  /**
   * Returns a paginated list of all registered users
   * @param limit - Max number of users to return (default: 10)
   * @param page - Page number to return (default: 1)
   */
  @Get()
  @ApiOperation({
    summary: 'Fetches a list of registered users',
  })
  @ApiResponse({
    status: 200,
    description: 'Users fetched successfully',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'The number of users return per query',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description: 'The number of page per query',
    example: 1,
  })
  @Auth(AuthType.None)
  getUsers(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.usersService.findAll(limit, page);
  }

  /**
   * Returns a single user by their ID
   * @param getUserDto - DTO containing the user ID from route params
   */
  @Get(':id')
  @ApiOperation({
    summary: 'Fetches registered user info with specific id',
  })
  @ApiResponse({
    status: 200,
    description: 'User fetched successfully',
  })
  getUser(@Param() getUserDto: GetUserDto) {
    return this.usersService.findByUserId(getUserDto.id);
  }

  /**
   * Creates a new user
   * @param createUserDto - DTO containing new user data
   */
  @Post()
  @Auth(AuthType.None)
  @UseInterceptors(ClassSerializerInterceptor)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  /**
   * Fully replaces an existing user's data
   * @param putUserDto - DTO containing updated user data
   */
  @Put()
  updateUser(@Body() putUserDto: PutUserDto) {
    console.log(putUserDto);

    return 'Update user endpoint hit';
  }

  @Post('create-many')
  public createManyUsers(@Body() createUsersDto: CreateManyUsersDto) {
    return this.usersService.createMany(createUsersDto);
  }
}

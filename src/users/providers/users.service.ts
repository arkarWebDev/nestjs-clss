import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create.user.dto';
import * as config from '@nestjs/config';
import authConfig from '../config/auth.config';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';

/**
 * Class to connect to Users table and make business tasks
 */
@Injectable()
export class UsersService {
  /**
   * Constructor to connect with other services to make operations
   * @param authService
   */
  constructor(
    /** Inject authService */
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    //** Inject ConfigService */
    private readonly configService: config.ConfigService,

    /** Inject Auth Config */
    @Inject(authConfig.KEY)
    private readonly authConfiguration: config.ConfigType<typeof authConfig>,

    /**
     * Inject user repository
     */
    @InjectRepository(User)
    private userRespository: Repository<User>,

    /**
     * Inject usersCreeateManyProvider
     */
    private readonly usersCreateManyProvider: UsersCreateManyProvider,
  ) {}

  /**
   * Method to create new user
   * @param createUserDto
   * @returns
   */
  public async createUser(createUserDto: CreateUserDto) {
    // email exist or not
    let existingUser;

    try {
      existingUser = await this.userRespository.findOne({
        where: { email: createUserDto.email },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Cannot process your request this time.',
        {
          description: 'Error when connecting to database',
        },
      );
    }
    // handle flow
    if (existingUser) {
      throw new BadRequestException(
        'Email already exists, please check your email.',
      );
    }

    // create new user
    let newUser = this.userRespository.create(createUserDto);

    try {
      newUser = await this.userRespository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException(
        'Cannot process your request this time.',
        {
          description: 'Error when connecting to database',
        },
      );
    }

    return newUser;
  }

  /**
   * Method to get all users form the db
   * @param limit
   * @param page
   * @returns
   */
  public findAll(limit: number, page: number) {
    const isAuth = this.authService.isAuth();

    const env = this.configService.get('AUTH_KEY');
    console.log(env);
    console.log(this.authConfiguration.fallbackUrl);

    console.log('auth status:', isAuth);
    return [
      {
        name: 'kyaw kyaw',
        email: 'kyawkyaw@codehubmm.com',
      },
      {
        name: 'zaw zaw',
        email: 'zaw zaw@codehubmm.com',
      },
      limit,
      page,
    ];
  }

  /**
   * Method to find specific user with id
   * @param id
   * @returns
   */
  public async findByUserId(id: number) {
    let user;
    try {
      user = await this.userRespository.findOneBy({
        id,
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Cannot process your request this time.',
        {
          description: 'Error when connecting to database',
        },
      );
    }

    if (!user) {
      throw new BadRequestException('User id does not exist.');
    }
    return user;
  }

  public async createMany(createUsersDto: CreateManyUsersDto) {
    return await this.usersCreateManyProvider.createMany(createUsersDto);
  }
}

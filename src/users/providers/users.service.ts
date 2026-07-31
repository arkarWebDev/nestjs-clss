import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthService } from 'src/auth/providers/auth.service';
import { User } from '../user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dtos/create.user.dto';

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
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    /**
     * Inject userModel
     */
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto);
    return await user.save();
  }
  /**
   * Method to get all users form the db
   * @param limit
   * @param page
   * @returns
   */
  public findAll(limit: number, page: number) {
    const isAuth = this.authService.isAuth();

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
   * @param userId
   * @returns
   */
  public findByUserId(userId: string) {
    return {
      id: userId,
      name: 'code hub',
      email: 'admin@codehubmm.com',
    };
  }
}

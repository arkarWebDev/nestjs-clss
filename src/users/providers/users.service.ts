import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/providers/auth.service';

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
  ) {}

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

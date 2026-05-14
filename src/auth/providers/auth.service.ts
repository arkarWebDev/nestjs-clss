import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

/**
 * Service to handle authentication logic
 */
@Injectable()
export class AuthService {
  /**
   * Creates an instance of AuthService
   * @param usersService - Injected UsersService (forward ref to avoid circular dependency)
   */
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  /**
   * Authenticates a user and returns an access token
   * @param email - User's email
   * @param password - User's password
   * @param id - User's ID
   * @returns A token string
   */
  public login(email: string, password: string, id: number) {
    const user = this.usersService.findByUserId(id);
    // login
    return 'TOKEN';
  }

  /**
   * Checks if the current request is authenticated
   * @returns boolean indicating auth status
   */
  public isAuth() {
    return true;
  }
}

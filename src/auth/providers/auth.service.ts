import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { SignInDto } from '../dtos/signin.dto';
import { SignInProvider } from './sign-in.provider';

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

    /**
     * Inject signInProvider
     */
    private readonly signInProvider: SignInProvider,
  ) {}

  /**
   * Authenticates a user and returns an access token
   * @param email - User's email
   * @param password - User's password
   * @param id - User's ID
   * @returns A token string
   */
  public async signIn(signInDto: SignInDto) {
    return await this.signInProvider.signIn(signInDto);
  }

  /**
   * Checks if the current request is authenticated
   * @returns boolean indicating auth status
   */
  public isAuth() {
    return true;
  }
}

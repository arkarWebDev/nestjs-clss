import { Controller } from '@nestjs/common';
import { AuthService } from './providers/auth.service';

/**
 * Controller to handle HTTP requests for the auth resource
 */
@Controller('auth')
export class AuthController {
  /**
   * @param authService - Injected AuthService for authentication logic
   */
  constructor(private readonly authService: AuthService) {}
}

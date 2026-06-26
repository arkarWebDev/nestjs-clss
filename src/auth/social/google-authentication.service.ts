import {
  forwardRef,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from '../config/jwt.config';
import * as config from '@nestjs/config';
import { GoogleTokenDto } from './dtos/google-token.dto';
import { UsersService } from 'src/users/providers/users.service';
import { GenerateTokenProvider } from '../providers/generate-token.provider';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauthClient!: OAuth2Client;

  constructor(
    /**
     * Inject jwtConfiguartion
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: config.ConfigType<typeof jwtConfig>,

    /**
     * Inject usersService
     */
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    /**
     * Inject generateTokensProvider
     */
    private readonly generateTokensProvider: GenerateTokenProvider,
  ) {}

  onModuleInit() {
    const clientId = this.jwtConfiguration.googleClientId;
    const clientSecret = this.jwtConfiguration.googleClientSecret;
    this.oauthClient = new OAuth2Client(clientId, clientSecret);
  }

  public async authenticate(googleTokenDto: GoogleTokenDto) {
    try {
      // verify google token
      const googleTicket = await this.oauthClient.verifyIdToken({
        idToken: googleTokenDto.token,
      });
      console.log(googleTicket);

      // extract payload from token
      const {
        email,
        sub: googleId,
        given_name: firstName,
        family_name: lastName,
      } = googleTicket.getPayload()!;
      const payload = googleTicket.getPayload();

      console.log(payload);
      // find user with googleId
      const user = await this.usersService.findOneByGoogleId(googleId);
      // if googleid ok, generate token & done
      if (user) {
        return this.generateTokensProvider.generateTokens(user);
      }
      // if googleid not ok, create new user with google & generate token
      const googleUser = await this.usersService.createGoogleUser({
        email: email!,
        firstName: firstName!,
        lastName: lastName!,
        googleId,
      });
      return this.generateTokensProvider.generateTokens(googleUser);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
    // if something wrong thorw unauthorized error
  }
}

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';

@Injectable()
export class MailService {
  constructor(
    /**
     * inject mailerService
     */
    private readonly mailerService: MailerService,
  ) {}

  public async sendWelcomeMail(user: User) {
    await this.mailerService.sendMail({
      to: user.email,
      from: `Support Team <support@nblog.com>`,
      subject: 'Welcome to NBlog',
      template: './welcome',
      context: {
        name: user.firstName,
        email: user.email,
      },
    });
  }
}

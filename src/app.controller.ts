import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * Root application controller
 */
@Controller()
export class AppController {
  /**
   * @param appService - Injected AppService
   */
  constructor(private readonly appService: AppService) {}

  /**
   * Root GET endpoint returning a greeting message
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

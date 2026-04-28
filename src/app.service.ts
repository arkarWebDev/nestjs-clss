import { Injectable } from '@nestjs/common';

/**
 * Root application service
 */
@Injectable()
export class AppService {
  /**
   * Returns a simple greeting string
   */
  getHello(): string {
    return 'Hello Nest!';
  }
}

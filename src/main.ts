import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appCreate } from './app.create';

/**
 * Bootstraps the NestJS application, sets up global validation pipe and Swagger docs
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  appCreate(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

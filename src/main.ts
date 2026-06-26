import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * Bootstraps the NestJS application, sets up global validation pipe and Swagger docs
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // swagger cofig
  const config = new DocumentBuilder()
    .setTitle('NestJs Mastery - Blog app API')
    .setDescription('Use the base API URL as http://localhost:3000')
    .addServer('http://localhost:3000')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);

  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../../src/app.module';
import { appCreate } from 'src/app.create';
import { ConfigService } from '@nestjs/config';
import { dropDatabase } from '../helpers/drop-database.helper';
import { MailService } from '../../src/mail/providers/mail.service';
import {
  missingEmail,
  missingFirstName,
  missingPassword,
  vaildFullUser,
} from './users.post.e2e-spec.sample-data';

describe('[Users] @Post Endpoints', () => {
  let app: INestApplication<App>;
  let config: ConfigService;
  let httpServer: App;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(MailService)
      .useValue({ sendWelcomeMail: jest.fn().mockResolvedValue(undefined) })
      .compile();

    app = moduleFixture.createNestApplication();
    appCreate(app);
    config = app.get<ConfigService>(ConfigService);
    httpServer = app.getHttpServer();
    await app.init();
  });

  afterEach(async () => {
    await dropDatabase(config);
    await app.close();
  });

  //   it('debug: env check', () => {
  //     console.log('NODE_ENV - ', process.env.NODE_ENV);
  //     console.log('DATABASE_NAME - ', process.env.DATABASE_NAME);
  //   });

  it('/users - firstName is required', () => {
    return request(httpServer)
      .post('/users')
      .send(missingFirstName)
      .expect(400);
  });

  it('/users - email is required', () => {
    return request(httpServer).post('/users').send(missingEmail).expect(400);
  });

  it('/users - password is required', () => {
    return request(httpServer).post('/users').send(missingPassword).expect(400);
  });

  it('/users - vaild data inputs successfully create new user', () => {
    return request(httpServer)
      .post('/users')
      .send(vaildFullUser)
      .expect(201)
      .then(({ body }) => {
        expect(body.data).toBeDefined();
        expect(body.data.firstName).toBe(vaildFullUser.firstName);
        expect(body.data.lastName).toBe(vaildFullUser.lastName);
        expect(body.data.email).toBe(vaildFullUser.email);
      });
  });

  it('/users - password is not returned in response', () => {
    return request(httpServer)
      .post('/users')
      .send(vaildFullUser)
      .expect(201)
      .then(({ body }) => {
        expect(body.data).toBeDefined();
        expect(body.data.password).toBeUndefined();
      });
  });

  it('/users - googleId is not returned in response', () => {
    return request(httpServer)
      .post('/users')
      .send(vaildFullUser)
      .expect(201)
      .then(({ body }) => {
        expect(body.data).toBeDefined();
        expect(body.data.googleId).toBeUndefined();
      });
  });
});

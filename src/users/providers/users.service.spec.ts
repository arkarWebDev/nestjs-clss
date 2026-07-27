import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateUserProvider } from './create-user.provider';
import { FindByUserEmailProvider } from './find-by-user-email.provider';
import { FindOneByGoogleIdProvider } from './find-one-by-google-id.provider';
import { CreateGoogleUserProvider } from './create-google-user.provider';
import { CreateUserDto } from '../dtos/create.user.dto';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const mockCreateUserProvider: Partial<CreateUserProvider> = {
      createUser: (createUserDto: CreateUserDto) =>
        Promise.resolve({
          id: 1,
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
          email: createUserDto.email,
          password: createUserDto.password,
        } as User),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: DataSource, useValue: {} },
        { provide: getRepositoryToken(User), useValue: {} },
        { provide: UsersCreateManyProvider, useValue: {} },
        { provide: CreateUserProvider, useValue: mockCreateUserProvider },
        { provide: FindByUserEmailProvider, useValue: {} },
        { provide: FindOneByGoogleIdProvider, useValue: {} },
        { provide: CreateGoogleUserProvider, useValue: {} },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('Controller should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should call createUser in CreateUserProvider', async () => {
    const user = await service.createUser({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.com',
      password: 'password',
    });
    expect(user.firstName).toEqual('John');
    expect(user.lastName).toEqual('Doe');
    expect(user.email).toEqual('john@doe.com');
  });
});

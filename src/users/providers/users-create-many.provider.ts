import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateUserDto } from '../dtos/create.user.dto';
import { User } from '../user.entity';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';

@Injectable()
export class UsersCreateManyProvider {
  constructor(
    /**Inject DataSource */
    private readonly dataSource: DataSource,
  ) {}

  public async createMany(createUsersDto: CreateManyUsersDto) {
    const newUsers: User[] = [];

    // Query Runner Instance
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      // Connect
      await queryRunner.connect();
      // Start
      await queryRunner.startTransaction();
    } catch (error) {
      throw new RequestTimeoutException('Cannot connect to the database');
    }

    try {
      for (let user of createUsersDto.users) {
        let newUser = queryRunner.manager.create(User, user);
        let result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }

      // If success -> commit
      await queryRunner.commitTransaction();
    } catch (error) {
      // If un-success -> rollback
      await queryRunner.rollbackTransaction();
      throw new ConflictException('Cannot complete this transaction', {
        description: String(error),
      });
    } finally {
      try {
        // release
        await queryRunner.release();
      } catch (error) {
        throw new RequestTimeoutException(
          'Cannot release this transaction connection',
          {
            description: String(error),
          },
        );
      }
    }
    return newUsers;
  }
}

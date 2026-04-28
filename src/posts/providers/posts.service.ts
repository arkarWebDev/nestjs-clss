import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

/**
 * Service to handle business logic for posts
 */
@Injectable()
export class PostsService {
  /**
   * Creates an instance of PostsService
   * @param usersService - Injected UsersService to resolve user data for posts
   */
  constructor(private readonly usersService: UsersService) {}

  /**
   * Returns all posts belonging to a specific user
   * @param userId - The ID of the user whose posts to fetch
   * @returns Array of post objects with associated user info
   */
  public findAll(userId: string) {
    const user = this.usersService.findByUserId(userId);

    return [
      {
        user,
        title: 'Title 1',
        content: 'Test content',
      },
      {
        user,
        title: 'Title 2',
        content: 'Test content 2',
      },
    ];
  }
}

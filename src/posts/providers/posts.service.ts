import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from '../dtos/create.post.dto';

/**
 * Service to handle business logic for posts
 */
@Injectable()
export class PostsService {
  /**
   * Creates an instance of PostsService
   * @param usersService - Injected UsersService to resolve user data for posts
   */
  constructor(
    private readonly usersService: UsersService,
    /** Inject postsRepository */
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  /**
   * Create new blog post
   * @param createPostDto
   * @returns
   */
  public async create(createPostDto: CreatePostDto) {
    let post = this.postsRepository.create(createPostDto);
    post = await this.postsRepository.save(post);
    return post;
  }

  /**
   * Returns all posts
   * @returns
   */
  public async findAll() {
    const posts = this.postsRepository.find();
    return posts;
  }

  /**
   * Returns all posts belonging to a specific user
   * @param userId - The ID of the user whose posts to fetch
   * @returns Array of post objects with associated user info
   */
  public findAllByUserId(userId: string) {
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

  /**
   * Delete post by its id
   * @param id
   * @returns
   */
  public async delete(id: number) {
    await this.postsRepository.delete(id);
    return { deleted: true, id };
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UsersService } from 'src/users/providers/users.service';
import { Post } from '../post.schema';
import { Model } from 'mongoose';
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
    /**
     * Inject postModel
     */
    @InjectModel(Post.name)
    private readonly postModel: Model<Post>,
  ) {}

  public async createPost(createPostDto: CreatePostDto) {
    const post = new this.postModel(createPostDto);
    return await post.save();
  }

  /**
   * Returns all posts belonging to a specific user
   * @param userId - The ID of the user whose posts to fetch
   * @returns Array of post objects with associated user info
   */
  public async findAll() {
    return await this.postModel.find().populate('author').exec();
  }
}

import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from '../dtos/create.post.dto';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch.post.dto';
import { GetPostsDto } from '../dtos/get-posts.dto';
import { PaginationProvider } from 'src/common/pagination/provider/pagination.provider';

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
    /**Inject usersService */
    private readonly usersService: UsersService,
    /**Inject tagsService */
    private readonly tagsService: TagsService,
    /**Inject paginationProvider */
    private readonly paginationProvider: PaginationProvider,
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
    let author = await this.usersService.findByUserId(createPostDto.authorId);

    if (!author) {
      throw new Error('Author not found');
    }

    let tags = await this.tagsService.findMultiTags(createPostDto.tags!);

    let post = this.postsRepository.create({
      ...createPostDto,
      author,
      tags,
    });
    post = await this.postsRepository.save(post);
    return post;
  }

  /**
   * Update existing blog with its id
   * @param patchPostDto
   * @returns
   */
  public async update(patchPostDto: PatchPostDto) {
    let tags = await this.tagsService.findMultiTags(patchPostDto.tags!);

    let post = await this.postsRepository.findOneBy({
      id: patchPostDto.id,
    });

    if (!post) {
      throw new Error('Post not found');
    }

    post.title = patchPostDto.title ?? post?.title;
    post.content = patchPostDto.content ?? post?.content;
    post.featureImgUrl = patchPostDto.featureImgUrl ?? post?.featureImgUrl;
    post.slug = patchPostDto.slug ?? post?.slug;
    post.status = patchPostDto.status ?? post?.status;
    post.publishOn = patchPostDto.publishOn ?? post?.publishOn;
    if (patchPostDto.meta) {
      post.meta.readTime = patchPostDto.meta.readTime ?? post.meta.readTime;
    }
    post.tags = tags;

    return await this.postsRepository.save(post);
  }

  /**
   * Returns all posts
   * @returns
   */
  public async findAll(postQuery: GetPostsDto) {
    let posts;

    if (postQuery.limit || postQuery.page) {
      posts = this.paginationProvider.paginateQuery(
        postQuery,
        this.postsRepository,
      );
    } else {
      posts = this.postsRepository.find();
    }
    return posts;
  }

  /**
   * Returns all posts belonging to a specific user
   * @param userId - The ID of the user whose posts to fetch
   * @returns Array of post objects with associated user info
   */
  public findAllByUserId(userId: number) {
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

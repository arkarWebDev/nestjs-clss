import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { CreatePostDto } from './dtos/create.post.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PatchPostDto } from './dtos/patch.post.dto';

/**
 * Controller to handle HTTP requests for the posts resource
 */
@Controller('posts')
export class PostsController {
  /**
   * @param postsService - Injected PostsService for post business logic
   */
  constructor(private readonly postsService: PostsService) {}

  /**
   * Returns all posts for a given user
   * @param userId - The user ID from the route parameter
   */
  @Get('/:userId')
  public getPostsByUserId(@Param('userId') userId: string) {
    return this.postsService.findAll(userId);
  }

  /**
   * Creates a new blog post
   * @param createPostDto - DTO containing new post data
   */
  @ApiOperation({
    summary: 'Create a new blog post',
  })
  @ApiResponse({
    status: 201,
    description: 'If you got 201 response, your post is created',
  })
  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    console.log(createPostDto);
  }

  /**
   * Partially updates an existing blog post
   * @param patchPostDto - DTO containing partial post data and post ID
   */
  @ApiOperation({
    summary: 'Update an existing blog post',
  })
  @ApiResponse({
    status: 200,
    description: 'If you got 200 response, your post is updated',
  })
  @Patch()
  public updatePost(@Body() patchPostDto: PatchPostDto) {
    console.log(patchPostDto);
  }
}

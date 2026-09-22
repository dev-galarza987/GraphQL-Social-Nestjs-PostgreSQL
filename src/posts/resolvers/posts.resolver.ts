import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostsService } from '../services/posts.service';
import { Post } from '../entities/post.entity';
import { CreatePostInput } from '../dto/create-post.input';
import { UpdatePostInput } from '../dto/update-post.input';
import { PaginationArgs } from '../../shared/dto/pagination.args';

@Resolver(() => Post)
export class PostsResolver {
  private readonly postsService: PostsService;

  constructor(postsService: PostsService) {
    this.postsService = postsService;
  }

  @Mutation(() => Post, { description: 'Crea una nueva publicación.' })
  async createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
  ): Promise<Post> {
    return await this.postsService.create(createPostInput);
  }

  @Query(() => [Post], {
    name: 'findAllPosts',
    description: 'Obtiene todas las publicaciones con paginación opcional.',
  })
  async findAll(@Args() paginationArgs: PaginationArgs): Promise<Post[]> {
    return await this.postsService.findAll(paginationArgs);
  }

  @Query(() => Post, { name: 'findOnePost', description: 'Obtiene una publicación por su ID.' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<Post> {
    return await this.postsService.findOne(id);
  }

  @Query(() => [Post], {
    name: 'searchPostsByTitle',
    description: 'Busca publicaciones por coincidencia en el título.',
  })
  async findByTitle(
    @Args('title', { type: () => String }) title: string,
  ): Promise<Post[]> {
    return await this.postsService.findByTitle(title);
  }

  @Query(() => [Post], {
    name: 'latestPosts',
    description: 'Obtiene las N publicaciones más recientes.',
  })
  async findLatest(
    @Args('limit', { type: () => Int, defaultValue: 5 }) limit: number,
  ): Promise<Post[]> {
    return await this.postsService.findLatest(limit);
  }

  @Mutation(() => Post, { description: 'Actualiza una publicación existente.' })
  async updatePost(
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ): Promise<Post> {
    return await this.postsService.update(updatePostInput.id, updatePostInput);
  }

  @Mutation(() => Post, { description: 'Elimina una publicación por su ID.' })
  async removePost(@Args('id', { type: () => Int }) id: number): Promise<Post> {
    return await this.postsService.remove(id);
  }
}

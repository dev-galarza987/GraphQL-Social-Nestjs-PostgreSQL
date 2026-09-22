import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CreatePostInput } from '../dto/create-post.input';
import { UpdatePostInput } from '../dto/update-post.input';
import { Post } from '../entities/post.entity';
import { PostsRepository } from '../repositories/posts.repository';
import { PostNotFoundException } from '../exceptions/posts.exception';
import { PaginationArgs } from '../../shared/dto/pagination.args';

@Injectable()
export class PostsService {
  private readonly postsRepository: PostsRepository;
  private readonly logger: PinoLogger;

  constructor(
    postsRepository: PostsRepository,
    @InjectPinoLogger(PostsService.name)
    logger: PinoLogger,
  ) {
    this.postsRepository = postsRepository;
    this.logger = logger;
  }

  async create(createPostInput: CreatePostInput): Promise<Post> {
    this.logger.info({ createPostInput }, 'Creando nueva publicación');
    const createdPost = await this.postsRepository.create(createPostInput);
    this.logger.info(
      { postId: createdPost.id },
      'Publicación creada exitosamente',
    );
    return createdPost;
  }

  async findAll(paginationArgs?: PaginationArgs): Promise<Post[]> {
    this.logger.info(
      { paginationArgs },
      'Buscando publicaciones con paginación',
    );
    return await this.postsRepository.findAll(paginationArgs);
  }

  async findOne(id: number): Promise<Post> {
    this.logger.info({ postId: id }, 'Buscando publicación por ID');
    const post = await this.postsRepository.findById(id);
    if (!post) {
      this.logger.warn({ postId: id }, 'Publicación no encontrada');
      throw new PostNotFoundException(id);
    }
    return post;
  }

  async update(id: number, updatePostInput: UpdatePostInput): Promise<Post> {
    this.logger.info({ postId: id, updatePostInput }, 'Actualizando publicación');
    const post = await this.findOne(id);
    const updatedPost = await this.postsRepository.update(post, updatePostInput);
    this.logger.info({ postId: id }, 'Publicación actualizada exitosamente');
    return updatedPost;
  }

  async remove(id: number): Promise<Post> {
    this.logger.info({ postId: id }, 'Eliminando publicación');
    const post = await this.findOne(id);
    const removedPost = await this.postsRepository.remove(post);
    this.logger.info({ postId: id }, 'Publicación eliminada exitosamente');
    return removedPost;
  }

  async findByTitle(title: string): Promise<Post[]> {
    this.logger.info({ title }, 'Buscando publicaciones por título');
    return await this.postsRepository.findByTitle(title);
  }

  async findLatest(limit: number): Promise<Post[]> {
    this.logger.info({ limit }, 'Buscando las últimas publicaciones');
    return await this.postsRepository.findLatest(limit);
  }
}

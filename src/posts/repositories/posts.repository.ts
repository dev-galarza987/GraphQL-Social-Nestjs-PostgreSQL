import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { BaseRepository } from '../../shared/repository/base.repository';
import { Post } from '../entities/post.entity';
import { CreatePostInput } from '../dto/create-post.input';
import { UpdatePostInput } from '../dto/update-post.input';

@Injectable()
export class PostsRepository extends BaseRepository<
  Post,
  CreatePostInput,
  UpdatePostInput
> {
  constructor(
    @InjectRepository(Post)
    postsRepository: Repository<Post>,
  ) {
    super(postsRepository);
  }

  /**
   * Consulta específica: Busca publicaciones por coincidencia parcial en el título.
   */
  async findByTitle(title: string): Promise<Post[]> {
    return await this.repository.find({
      where: { title: ILike(`%${title}%`) },
    });
  }

  /**
   * Consulta específica: Obtiene las N publicaciones más recientes.
   */
  async findLatest(limit: number = 5): Promise<Post[]> {
    return await this.repository.find({
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }
}

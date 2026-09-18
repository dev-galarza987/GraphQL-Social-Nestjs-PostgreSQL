import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  private readonly postsRepository: Repository<Post>;

  constructor(@InjectRepository(Post) postsRepository: Repository<Post>) {
    this.postsRepository = postsRepository;
  }

  create(createPostInput: CreatePostInput) {
    return 'This action adds a new post';
  }

  async findAll(): Promise<Post[]> {
    return await this.postsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostInput: UpdatePostInput) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}

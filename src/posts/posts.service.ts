import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  create(createPostInput: CreatePostInput) {
    return 'This action adds a new post';
  }

  findAll(): Post[] {
    return [
      {
        id: 1,
        title: "NestJS 12",
        description: "Descripción sobre NestJS 12"
      },
      {
        id: 2,
        title: "ASP.NET Core 8",
        description: "Descripción sobre ASP.NET Core 8."
      },
      {
        id: 3,
        title: "Spring Boot 7",
        description: "Descripción sobre Spring Boot 7"
      },
      {
        id: 4,
        title: "FastAPI",
        description: "Descripción sobre FastAPI"
      },
      {
        id: 5,
        title: "Axum",
        description: "Descripción sobre Axum."
      }
    ];
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

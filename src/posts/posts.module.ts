import { Module } from '@nestjs/common';
import { PostsService } from './services/posts.service';
import { PostsResolver } from './resolvers/posts.resolver';
import { PostsRepository } from './repositories/posts.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PostsResolver, PostsService, PostsRepository],
  exports: [PostsService, PostsRepository],
})
export class PostsModule {}

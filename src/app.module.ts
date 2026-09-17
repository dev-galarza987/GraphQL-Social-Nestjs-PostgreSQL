import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'node:path'
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  }), PostsModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'GqlSocialDB',
    username: 'galarza',
    password: '12413087',
    synchronize: true,
    autoLoadEntities: true,
    entities: [__dirname + '/**/*.entity{.ts,.js}']
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

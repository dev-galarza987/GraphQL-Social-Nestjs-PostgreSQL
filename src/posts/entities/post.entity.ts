import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType({ description: "Entidad GraphQL de publicaciones." })
@Entity({ name: "post" })
export class Post {
  @Field(() => Int, { description: 'Identificador unico de publicación.' })
  @PrimaryGeneratedColumn({ name: "post_id", type: 'int' })
  id: number;

  @Field({ nullable: false, description: "Título de la publicación." })
  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @Field({ description: "Description opcional de la publicación." })
  @Column({ type: 'text', nullable: true })
  description?: string;
}

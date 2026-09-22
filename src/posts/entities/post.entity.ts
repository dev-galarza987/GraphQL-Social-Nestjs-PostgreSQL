import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IEntity } from '../../shared/entity/generic.entity';

@ObjectType({ description: 'Entidad GraphQL de publicaciones.' })
@Entity({ name: 'post' })
export class Post implements IEntity {
  @Field(() => Int, { description: 'Identificador único de publicación.' })
  @PrimaryGeneratedColumn({ name: 'post_id', type: 'int' })
  id: number;

  @Field({ nullable: false, description: 'Título de la publicación.' })
  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @Field({ nullable: true, description: 'Descripción opcional de la publicación.' })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @Field(() => Date, { description: 'Fecha de creación de la publicación.' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field(() => Date, { description: 'Fecha de última actualización.' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

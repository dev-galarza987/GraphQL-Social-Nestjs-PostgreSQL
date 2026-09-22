import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field({ description: 'Título de la publicación.' })
  @IsString()
  @IsNotEmpty({ message: 'El título no puede estar vacío.' })
  @MinLength(3, { message: 'El título debe tener al menos 3 caracteres.' })
  title: string;

  @Field({ nullable: true, description: 'Descripción opcional de la publicación.' })
  @IsString()
  @IsOptional()
  description?: string;
}

import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType({ description: "Entidad GraphQL de publicaciones." })
export class Post {
  @Field(() => Int, { description: 'Identificador unico de publicación.' })
  id: number;

  @Field({ nullable: false, description: "Título de la publicación." })
  title: string;

  @Field({ description: "Description opcional de la publicación." })
  description?: string;
}

import { CreatePostInput } from './create-post.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsInt, Min } from 'class-validator';
import { IUpdateDto } from '../../shared/dto/generic.dto';

@InputType()
export class UpdatePostInput
  extends PartialType(CreatePostInput)
  implements IUpdateDto
{
  @Field(() => Int, { description: 'Identificador único de la publicación a actualizar.' })
  @IsInt()
  @Min(1)
  id: number;
}

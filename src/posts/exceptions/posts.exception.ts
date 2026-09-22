import { NotFoundException, BadRequestException } from '@nestjs/common';

export class PostNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`La publicación con ID #${id} no fue encontrada.`);
  }
}

export class PostBadRequestException extends BadRequestException {
  constructor(message: string) {
    super(message);
  }
}

import { applyDecorators, UsePipes } from '@nestjs/common';
import { ObjectSchema } from '@hapi/joi';
import { JoiValidationPipe } from 'src/pipes/joivalidation.pipe';

export function JoiValidation(schema: ObjectSchema) {
  return applyDecorators(UsePipes(new JoiValidationPipe(schema)));
}

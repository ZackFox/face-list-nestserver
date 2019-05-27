import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const errors = await validate(plainToClass(metatype, value));
    if (errors.length > 0) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          errors: errors.reduce((obj, err) => {
            obj[err.property] = Object.values(err.constraints);
            return obj;
          }, {}),
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}

import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import * as _ from 'lodash';
import { ValidatorOptions } from '@nestjs/common/interfaces/external/validator-options.interface';

export interface ValidationPipeOptions extends ValidatorOptions {
  transform?: boolean;
  whitelist: true;
  forbidNonWhitelisted: true;
  disableErrorMessages?: boolean;
  exceptionFactory?: (errors: ValidationError[]) => any;
}

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  options;
  constructor(options) {
    this.options = options;
  }
  async transform(value, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException('No data submitted');
    }

    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object, this.options);
    if (errors.length > 0) {
      throw new HttpException(
        {
          message: 'Input data validation failed',
          errors: this.buildError(errors),
        },
        this.options.errorHttpStatusCode || HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return value;
  }

  private buildError(errors) {
    const result = {};
    errors.forEach((el) => {
      let prop = el.property;
      Object.entries(el.constraints).forEach((constraint) => {
        console.log(constraint);
        if (!result[prop]) result[prop] = [];
        const message: any = constraint[1];
        result[prop].push({
          type: constraint[0],
          message: _.upperFirst(constraint[1]),
        });
      });
    });
    return result;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }
}

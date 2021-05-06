import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class ErrorException implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let body: any =
      exception instanceof HttpException ? exception.getResponse() : {};

    const message: any =
      exception['detail'] ||
      exception['message'] ||
      "Something went wrong, We're working on getting it fixed as soon as we can.";

    if (typeof body == 'object') {
      body.message = message;
    } else {
      body = { message };
    }

    console.log(body);

    response.status(status).json({
      ...body,
    });
  }
}

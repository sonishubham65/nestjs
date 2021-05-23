import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class LoggerException implements ExceptionFilter {
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
      "Something went wrong, We're working on getting it fixed as soon as we can.";
    let log: object;

    const isValidBody = Object.keys(body).length;
    if (isValidBody) {
      log = { body };
    } else {
      log = {
        exception_message: exception['message'],
        exception_detail: exception['detail'],
        exception_stack: exception.stack,
        message: message,
      };
    }

    request.logger.info('Exception Caught Error', log);
    response.status(status).json(isValidBody ? body : { message });
  }
}

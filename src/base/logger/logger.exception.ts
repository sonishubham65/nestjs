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
      body.message ||
      exception['message'] ||
      exception['detail'] ||
      "Something went wrong, We're working on getting it fixed as soon as we can.";

    if (typeof body !== 'object') {
      body = { message };
    }

    request.logger.info('Exception Caught Error', body);
    response.status(status).json({
      ...body,
    });
  }
}

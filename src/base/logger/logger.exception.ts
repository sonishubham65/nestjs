import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from "@nestjs/common";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const body: any =
      exception instanceof HttpException ? exception.getResponse() : {};

    switch (status) {
      case 500: {
        body.message =
          "Something went wrong, We're working on getting it fixed as soon as we can.";
      }
    }
    request.logger.info("Exception Caught Error", body);
    response.status(status).json({
      ...body,
    });
  }
}

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Request, Response } from "express";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
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
    response.status(status).json({
      ...body,
    });
  }
}

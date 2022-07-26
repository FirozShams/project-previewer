import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse();

    const data = {
      success: false,
      message: exceptionResponse['message'],
      data: exceptionResponse['data'] || null,
    };

    const requestDashboard = {
      method: request.method,
      query_params: request.query,
      body: request.body,
      requested_endpoint: request.originalUrl,
      response_body: data,
      status: status,
    };

    const logString =
      JSON.stringify(requestDashboard) +
      '\n' +
      [request.method, request.originalUrl, status].join(' ');

    Logger.log(logString, 'HttpExceptionFilter');

    response.status(status).json(data);
  }
}

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Request, Response } from 'express';

import { v4 as uuidv4 } from 'uuid';
import { Logger } from '@nestjs/common';

@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() === 'http') {
      const ctx = context.switchToHttp();
      const request = ctx.getRequest<Request>();
      const response = ctx.getResponse<Response>();

      const request_id = uuidv4().split('-').join('');

      request.headers['X-Request-Id'] = request_id;
      response.set('X-Request-Id', request_id);

      return next.handle().pipe(
        tap((data) => {
          const requestDashboard = {
            method: request.method,
            query_params: request.query,
            requested_endpoint: request.originalUrl,
            status: response.statusCode,
          };
          let logString = JSON.stringify(requestDashboard) + '\n';
          logString =
            logString +
            [request.method, request.originalUrl, response.statusCode].join(
              ' ',
            );

          Logger.log(logString, 'RequestLoggingInterceptor');
        }),
      );
    }
  }
}

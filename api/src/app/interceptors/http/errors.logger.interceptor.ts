import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Request } from 'express';
import { Logger } from '@nestjs/common';

@Injectable()
export class ErrorsLoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest<Request>();
        const requestDashboard = {
          method: request.method,
          query_params: request.query,
          body: request.body,
          requested_endpoint: request.originalUrl,
        };
        const logString = JSON.stringify(requestDashboard) + '\n';
        Logger.error(logString);
        return throwError(err);
      }),
    );
  }
}

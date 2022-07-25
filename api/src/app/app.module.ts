import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR, APP_FILTER, APP_GUARD } from '@nestjs/core';

import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

import { HttpExceptionFilter } from './filters/http/exeptions.formatter.filter';

import {
  RequestLoggingInterceptor,
  ResponseTransformInterceptor,
  ErrorsLoggerInterceptor,
} from './interceptors/http';

import { CommonModule } from 'src/common/common.module';
import { UsersModule } from 'src/users/users.module';
import { ReposModule } from 'src/repos/repos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      cache: true,
    }),
    CommonModule,
    UsersModule,
    ReposModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsLoggerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    AppService,
  ],
})
export class AppModule {}

// mongo-exception.interceptor.ts

import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException, Logger } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MongoError } from 'mongodb';

@Injectable()
export class MongoExceptionInterceptor implements NestInterceptor {
  private readonly logger = new Logger(MongoExceptionInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        if (error instanceof MongoError) {
          this.logger.error(error.message);
          return throwError(new BadRequestException('Error interno de MongoDB'));
        }
        this.logger.error(error.message);
        return throwError(error);
      }),
    );
  }
}

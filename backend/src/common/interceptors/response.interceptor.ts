import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();

        // Allow service/controller to pass a custom message
        let message = 'Request successful';
        if (data && data.message) {
          message = data.message;
          delete data.message; // remove from payload if provided
        }

        return {
          statusCode: response.statusCode,
          success: true,
          message,
          timestamp: new Date().toISOString(),
          path: ctx.getRequest().url,
          data,
        };
      }),
    );
  }
}

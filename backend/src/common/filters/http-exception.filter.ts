// src/common/filters/http-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = 'Internal server error';
    let details: any = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && (res as any).message) {
        const errResp = res as any;
        message = Array.isArray(errResp.message)
          ? errResp.message.join(', ')
          : errResp.message;
      } else {
        message = res;
      }
    } else {
      if (process.env.NODE_ENV !== 'production') {
        details = (exception as any).message || exception;
      }
    }

    response.status(status).json({
      statusCode: status,
      success: false,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
      errors: Array.isArray(message) ? message : [message],
      ...(details && { details }),
    });
  }
}

import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import * as path from 'path';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse();
    const req = host.switchToHttp().getRequest();
    const { UNAUTHORIZED, NOT_FOUND, INTERNAL_SERVER_ERROR } = HttpStatus;

    const status =
      error instanceof HttpException
        ? error.getStatus()
        : INTERNAL_SERVER_ERROR;

    if (!req.url.includes('api/')) {
      return res.sendFile(path.join(__dirname, '../', '/public/index.html'));
    }

    if (status === UNAUTHORIZED) {
      return res
        .status(status)
        .send({
          statusCode: 401,
          error: 'UNAUTHORIZED',
          message: 'User is unauthorized',
        });
    }
    if (status === NOT_FOUND) {
      return res.status(status).send({
        statusCode: 404,
        error: 'Not Found',
        message: `Cannot GET ${req.url}`,
      });
    }
    if (status === INTERNAL_SERVER_ERROR) {
      if (process.env.NODE_ENV === 'production') {
        console.error(error.stack);
        return res.status(status).send({
          statusCode: 500,
          error: 'INTERNAL SERVER ERROR',
          message: 'Server do NOT response',
        });
      }
      return res.status(status).send(error.stack);
    }
  }
}

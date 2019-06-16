import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  NotFoundException,
} from '@nestjs/common';
import * as path from 'path';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse();
    return res.sendFile(path.join(__dirname, '../', '/public/index.html'));
  }
}

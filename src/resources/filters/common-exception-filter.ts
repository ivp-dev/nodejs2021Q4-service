import { Catch, HttpException, ArgumentsHost, HttpAdapterHost, HttpStatus } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";

import { CommonExceptionMessage } from '../../types';

@Catch(HttpException)
export class CommonExceptionFilter extends BaseExceptionFilter {
  constructor(public httpAdapterHost: HttpAdapterHost) {
    super();
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();

    // All nestjs exceptions are instanceof HttpException
    // So we can easily delegate those exception to nestjs
    if (exception instanceof HttpException) {
      // Error logging
      super.catch(exception, host);

      return;
    }

    const { httpAdapter } = this.httpAdapterHost;

    const responseBody: CommonExceptionMessage = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(context.getRequest()),
    };

    httpAdapter.reply(context.getResponse(), responseBody, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Error } from 'mongoose';
import { MongoError } from 'mongodb';
import { Request, Response } from 'express';

@Catch(Error)
export class MongooseExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = 401;
    console.log(exception);

    // const errors = exception.errors;
    // const errorMessage = {};
    // for (const errorField in errors) {
    //   if (errors.hasOwnProperty(errorField)) {
    //     const errorObject = errors[errorField];
    //     errorMessage[errorField] = errorObject.message;
    //   }
    // }

    // TODO: Handle ValidationError, CastError Seperatly. And Give Error Message accordingly.
    response.status(status).json({
      statusCode: status,
      message: 'Please provide valid input',
      error: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

@Catch(MongoError)
export class MongoDBExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = 401;
    console.log(exception);

    // const errors = exception.errors;
    // const errorMessage = {};
    // for (const errorField in errors) {
    //   if (errors.hasOwnProperty(errorField)) {
    //     const errorObject = errors[errorField];
    //     errorMessage[errorField] = errorObject.message;
    //   }
    // }

    // TODO: Handle ValidationError, CastError Seperatly. And Give Error Message accordingly.
    response.status(status).json({
      statusCode: status,
      message: 'Please provide valid input',
      error: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

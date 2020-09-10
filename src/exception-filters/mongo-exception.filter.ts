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
    const excE = exception as any;

    const errors = excE.errors;
    const errorMessage = {};
    for (const errorField in errors) {
      if (errors.hasOwnProperty(errorField)) {
        const errorObject = errors[errorField];
        errorMessage[errorField] = errorObject.message;
      }
    }

    // TODO: Handle ValidationError, CastError Seperatly. And Give Error Message accordingly.
    let errorMessageStr: any = 'Please provide valid input';
    if (errorMessage && Reflect.ownKeys(errorMessage).length) {
      errorMessageStr = Object.values(errorMessage)[0];
    } 
    response.status(status).json({
      statusCode: status,
      message: errorMessageStr,
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
    let errorMessage = 'Please provide valid input';
    const error = exception as any;
    if (exception.code === 11000) {
      errorMessage = `Duplicate value for field ${String(Reflect.ownKeys(error.keyValue)[0])}.`;
      if (String(Reflect.ownKeys(error.keyValue)[0]) === 'email') {
        errorMessage = ' Entered email already exists. Please try another one';
      }
    }
    response.status(status).json({
      statusCode: status,
      message: errorMessage,
      error: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

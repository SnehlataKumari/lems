import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Error } from 'mongoose';
import { MongoError } from 'mongodb';
export declare class MongooseExceptionFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost): void;
}
export declare class MongoDBExceptionFilter implements ExceptionFilter {
    catch(exception: MongoError, host: ArgumentsHost): void;
}

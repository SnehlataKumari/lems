import { ObjectSchema } from '@hapi/joi';
export declare function JoiValidation(schema: ObjectSchema): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;

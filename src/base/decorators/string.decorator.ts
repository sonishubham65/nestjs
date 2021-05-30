import { registerDecorator, buildMessage } from 'class-validator';

export function IsValidString(args: any = {}) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsValidString',
      target: object.constructor,
      propertyName,
      validator: {
        validate(value: any) {
          return value?.match(/^[a-zA-Z0-9 @$%&./#*,()+\-'|?]*$/);
        },
        defaultMessage: buildMessage((eachPrefix) => {
          return args.message || `${propertyName} must be a valid string`;
        }),
      },
    });
  };
}

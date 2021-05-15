import { registerDecorator, buildMessage } from 'class-validator';

export function IsStrongPassword(args: any = {}) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsStrongPassword',
      target: object.constructor,
      propertyName,
      validator: {
        validate(value: any) {
          return value.match(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$~!%*?^&])[A-Za-z\d@$~^!%*?&]{1,100}$/,
          );
        },
        defaultMessage: buildMessage(
          (eachPrefix) =>
            args.message ||
            'Password should contain atleast one uppercase, one special character.',
        ),
      },
    });
  };
}

import { registerDecorator, buildMessage } from 'class-validator';
import _ from 'lodash';
import * as moment from 'moment-timezone';

/**
 * @author: Shubham
 * @description: This custom validator can be used in dto to validate if date is in user input format
 */
export function IsValidDate(format) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsValidDate',
      target: object.constructor,
      propertyName,
      validator: {
        validate(value: any) {
          try {
            console.log(
              `moment(value, format, true)`,
              value,
              moment(value, format, true),
            );
            return moment(value, format, true).isValid();
          } catch (e) {
            console.log(e);
            return false;
          }
        },
        defaultMessage: buildMessage(
          (eachPrefix) => `${eachPrefix}$property must be in a valid format.`,
        ),
      },
    });
  };
}

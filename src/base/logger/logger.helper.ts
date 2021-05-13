import * as winston from 'winston';
import { LoggingWinston } from '@google-cloud/logging-winston';
import * as _ from 'lodash';

const loggingWinston = new LoggingWinston();

const transports: any = [new winston.transports.Console()];

const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  transports: transports,
  exitOnError: false,
});

const targetWords = [
  'firstName',
  'lastName',
  'guardianFirstName',
  'dob',
  'gender',
  'Address1',
  'Address2',
  'street',
  'primaryPhoneNumber',
  'authorization',
  'email',
  'zipcode',
];
export class LoggerHelper {
  requestId;
  userId;
  constructor(req) {
    this.requestId = req.uuid;
    this.userId = req.userId;
  }

  logging(level, ...data) {
    const log: any = {};
    let logData = [];
    let i = 0;
    data.forEach((value) => {
      if (_.isString(value) && i == 0) {
        log.message = value;
      } else {
        try {
          JSON.stringify(value, null, 4);
          logData.push(_.cloneDeep(value));
        } catch (e) {}
      }
      i++;
    });

    log.load = logData;
    log.message = log.message || 'Winston logger:';

    log.userId = this.userId;
    log.requestId = this.requestId;
    console.log(`Logger`, log);
    logger[level](log);
  }

  error(...data) {
    this.logging('error', ...data);
  }
  warn(...data) {
    this.logging('warn', ...data);
  }
  debug(...data) {
    this.logging('debug', ...data);
  }
  verbose(...data) {
    this.logging('verbose', ...data);
  }
  info(...data) {
    this.logging('info', ...data);
  }
  log(...data) {
    this.logging('log', ...data);
  }
}

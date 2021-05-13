import { LoggerHelper } from './logger.helper';
import { v4 as uuid } from 'uuid';
import * as jwt from 'jsonwebtoken';

export function LoggerMiddleware(req, res, next) {
  req.uuid = uuid();
  req.logger = new LoggerHelper(req);

  // Get the token if available and assign the user id with logger, this user id would be temporary and will be changed with Auth guard.
  if (req.headers.authorization) {
    const token: any = jwt.decode(
      req.headers.authorization.replace(/^Bearer\s/, ''),
    );
    if (token) req.userId = token.user_id;
  }

  // Setup logger user Id.
  req.logger.userId = req.userId;

  // write first incoming log and save body, headers, path, params.
  req.logger.info('Incoming request', {
    body: req.body,
    method: req.method,
    headers: req.headers,
    path: req.path,
    query: req.query,
  });
  next();
}

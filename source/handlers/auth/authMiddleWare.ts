import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';

import { passportConfig } from '../../config/passport_config';
import { User } from '../../types/user';

const authMiddleware = () => {
  return (request: Request, response: Response, next: NextFunction) => {
    passportConfig.authenticate('bearer', { session: false }, (error: Error, object: User) => {
      if (error) {
        return next(new HttpException(403, 'Your JWT token expired. Please relogin to app.', 'authenticate'));
      }
      if (!object) {
        return next(new HttpException(401, 'This unauthorized error.', 'authenticate'));
      }
      next();
    })(request, response, next);
  };
};

export default authMiddleware;

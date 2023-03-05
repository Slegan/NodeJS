import Controller from "../interfaces/controller";
import { Router, Request, Response, NextFunction } from "express";
import { createValidator } from 'express-joi-validation';
import { validateLogInData } from '../schemas/validation';
import UserService from '../services/UserService';
import { TokenData } from '../interfaces/TokenData';
import AuthService from '../services/AuthService';
import HttpException from '../handlers/exceptions/HttpException';

const validator = createValidator();

class AuthenticationController implements Controller {
  path = '/auth';
  router = Router();
  userService = new UserService();

  constructor() {
    this.initRouters();
  }

  initRouters() {
    this.router.post(`${this.path}/login`, validator.body(validateLogInData), this.logginIn);
  }

  logginIn = async (request: Request, response: Response, next: NextFunction) => {
    const userData = request.body;
    await this.userService.getUserByLoginAndPassword(userData.login, userData.password)
      .then((requestedUser: any) => {
        const user = requestedUser.rows[0];

        user.password = undefined;
        const tokenData: TokenData = AuthService.createToken(user);

        response.send({
          message: 'You was logined. This your authorization TOKEN: ',
          token: tokenData.token
        });
      })
      .catch((error: Error) => {
        next(new HttpException(401, 'Login FAILED. No user with that credentials.', `logginIn --- ${error}`));
      });
  };
}

export default AuthenticationController;

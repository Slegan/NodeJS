// @ts-ignore
import passport from 'passport';
// @ts-ignore
import BearerStrategy from 'passport-http-bearer';
// @ts-ignore
import jwt from 'jsonwebtoken';
import UserService from '../services/UserService';

export const passportConfig = passport.use(new BearerStrategy((token: string, done: any) => {
  let payload;
  const userService = new UserService();
  try {
    payload = jwt.verify(token, 'secret-key');
    // payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    // JWT Expired
    return done(error);
  }

  return userService.getUserById(payload._id)
    .then((requestedUser: any) => {
      const user = requestedUser.rows[0];

      if (!user) {
        return done(null, false);
      }
      return done(null, user, {
        scope: 'all'
      });
    })
    .catch((error: any) => {
      return done(error);
    });
  })
);

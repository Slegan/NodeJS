import { User } from '../types/user';
import { TokenData, DataStoredInToken } from '../interfaces/TokenData';
// @ts-ignore
import * as jwt from 'jsonwebtoken';

const createToken = (user: User): TokenData => {
  const expiresIn = 60 * 2;
  const secret = process.env.JWT_SECRET;
  const dataStoredInToken: DataStoredInToken = {
    _id: user.id
  };
  console.log(secret, 'la');
  
  return {
    expiresIn,
    token: jwt.sign(dataStoredInToken, 'secret-key', { expiresIn })
  };
};

export default {
  createToken
};

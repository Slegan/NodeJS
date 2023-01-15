import { Router, Request, Response  } from "express";
import { createValidator } from 'express-joi-validation';

import { UserSchema } from '../schemas/validation';
import {
  createDefaultUsers,
  createUser,
  deleteUser,
  getUsers,
  getUserById,
  updateUser,
} from '../models/postgers';

const router = Router();
const validator = createValidator();

router
  .get('/', createDefaultUsers)

router
  .get('/users/:id', getUserById)
  .delete('/users/:id', deleteUser)

router
  .get('/users', getUsers)
  .post('/users', 
    validator.body(UserSchema),
    createUser,
  )
  .put('/users', 
    validator.body(UserSchema),
    updateUser
  )

export default router;

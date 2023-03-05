import { Router, Request, Response, NextFunction } from "express";
import { createValidator } from 'express-joi-validation';
import HttpException from "../handlers/exceptions/HttpException";

import Controller from "../interfaces/controller";
import { UserSchema } from "../schemas/validation";
import UserService from "../services/UserService";
import { User } from "../types/user";
import authMiddleware from "../handlers/auth/authMiddleWare"

const validator = createValidator();

class UserController implements Controller {
  path = '/users';
  router = Router();
  userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
    this.initRouters()
  }

  initRouters() {
    this.router.get(`${this.path}`, authMiddleware(), this.getUsers);
    this.router.post(`${this.path}`, authMiddleware(), validator.body(UserSchema), this.createUser);
    this.router.put(`${this.path}`, authMiddleware(), validator.body(UserSchema), this.updateUser);
    this.router.get(`${this.path}/create`, authMiddleware(), this.createDefaultUsers);
    this.router.get(`${this.path}/:id`, authMiddleware(), this.getUserById);
    this.router.delete(`${this.path}/:id`, authMiddleware(), this.deleteUser);
  }

  getUsers = async (req: Request, res: Response, next: NextFunction) => {
    await this.userService.getUsers()
      .then((users: any) => {
        console.log(users);
        
        res.status(200).json(users.rows)
      })
      .catch((error: Error) => {
        next(new HttpException(400, `Users not exist, ${error}`, 'getUsers'));
      })
  }

  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    await this.userService.getUserById(id)
      .then((users: any) => {
        console.log(users.rows);
        
        res.status(200).json(users.rows)
      })
      .catch((error: Error) => {
        next(new HttpException(400, `User with id ${id} not exist, ${error}`, 'getUserById'));
      })
  }

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { age, id, isDeleted, login, password } = req.body;
  
    await this.userService.createUser(age, id, isDeleted, login, password)
      .then((users: any) => {
        res.status(201).send(`User added with ID: ${users?.rows[0].id}`)
      })
      .catch((error: Error) => {
        next(new HttpException(400, `User not created, ${error}, params: ${age}, ${id}, ${isDeleted}, ${login}, ${password}`, 'createUser'));
        res.status(400).json({
          message: `User not created, ${error}`
        })
      })
  }

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const { age, id, isDeleted, login, password } = req.body;

    await this.userService.updateUser(age, id, isDeleted, login, password)
      .then((users: any) => {
        res.status(200).send(`User modified with ID: ${id}`)
      })
      .catch((error: Error) => {
        next(new HttpException(400, `User not updated, ${error}, params: ${age}, ${id}, ${isDeleted}, ${login}, ${password}`, 'updateUser'));
      })
  }

  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    await this.userService.deleteUser(id)
      .then(() => {
        res.status(200).send(`User deleted with ID: ${id}`)
      })
      .catch((error: Error) => {
        next(new HttpException(400, `User not deleted, ${error}`, 'deleteUser'));
      })
  }

  createDefaultUsers = (req: Request, res: Response, next: NextFunction) => {
    const list: User[] = [
      {age: 5, id: '15', isDeleted: false, login: 'test1', password: 'test1'},
      {age: 6, id: '16', isDeleted: false, login: 'test2', password: 'test2'},
      {age: 7, id: '17', isDeleted: false, login: 'test3', password: 'test3'},
      {age: 8, id: '18', isDeleted: false, login: 'test4', password: 'test4'},
      {age: 9, id: '19', isDeleted: false, login: 'test5', password: 'test5'}
    ]

    try {
      list.forEach(async (user: User) => {
        const { age, id, isDeleted, login, password } = user;
        
        await this.userService.createDefaultUsers(age, id, isDeleted, login, password)
          .then(() => {
            console.log(age);
            res.status(201)
          })
          .catch((error: Error) => {
            res.status(400).json({
              message: `User not deleted, ${error}`
            })
          })
      })
    } catch (error) {
      next(new HttpException(400, `User default list not created, ${error}`, 'createDefaultUsers'));
    }
  
    res.send(`Users default list was created`)
  }
}

export default UserController;

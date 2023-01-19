import { Router, Request, Response  } from "express";
import { createValidator } from 'express-joi-validation';

import Controller from "../interfaces/controller";
import { UserSchema } from "../schemas/validation";
import UserService from '../services/UserService'
import { User } from "../types/user";

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
    this.router.get(`${this.path}`, this.getUsers);
    this.router.post(`${this.path}`, validator.body(UserSchema), this.createUser);
    this.router.put(`${this.path}`, validator.body(UserSchema), this.updateUser);
    this.router.get(`${this.path}/create`, this.createDefaultUsers);
    this.router.get(`${this.path}/:id`, this.getUserById);
    this.router.delete(`${this.path}/:id`, this.deleteUser);
  }

  getUsers = async (req: Request, res: Response) => {
    await this.userService.getUsers()
      .then((users: any) => {
        res.status(200).json(users.rows)
      })
      .catch((error: Error) => {
        res.status(404).json({
          message: `Users not exist, ${error}`
        })
      })
  }

  getUserById = async (req: Request, res: Response) => {
    console.log('123');
    
    const id = parseInt(req.params.id);

    await this.userService.getUserById(id)
      .then((users: any) => {
        res.status(200).json(users.rows)
      })
      .catch((error: Error) => {
        res.status(404).json({
          message: `User with id ${id} not exist, ${error}`
        })
      })
  }

  createUser = async (req: Request, res: Response) => {
    const { age, id, isDeleted, login, password } = req.body;
  
    await this.userService.createUser(age, id, isDeleted, login, password)
      .then((users: any) => {
        res.status(201).send(`User added with ID: ${users?.rows[0].id}`)
      })
      .catch((error: Error) => {
        res.status(400).json({
          message: `User not created, ${error}`
        })
      })
  }

  updateUser = async (req: Request, res: Response) => {
    const { age, id, isDeleted, login, password } = req.body;

    await this.userService.updateUser(age, id, isDeleted, login, password)
      .then((users: any) => {
        res.status(200).send(`User modified with ID: ${id}`)
      })
      .catch((error: Error) => {
        res.status(400).json({
          message: `User not updated, ${error}`
        })
      })
  }

  deleteUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    await this.userService.deleteUser(id)
      .then(() => {
        res.status(200).send(`User deleted with ID: ${id}`)
      })
      .catch((error: Error) => {
        res.status(400).json({
          message: `User not deleted, ${error}`
        })
      })
  }

  createDefaultUsers = (req: Request, res: Response) => {
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
      res.status(400).json({
        message: `${error}`
      })
    }
  
    res.send(`Users default list was created`)
  }
}

export default UserController;

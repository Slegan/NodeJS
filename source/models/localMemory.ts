import { Request, Response  } from "express";
import NodeCache from "node-cache";

import { User, UserListRequest } from '../types/user';

const cache = new NodeCache();

const defaultRoot = (req: Request, res: Response) => {
  res.send('Hello, please use /users to get more info');
}

const getUserById = (req: Request, res: Response) => {
  console.log(cache.has(req.params.id), req.params.id);
  if (cache.has(req.params.id)) {
    res.send(cache.get(req.params.id));
  } else {
    res.status(404).json({
      message: `User with id ${req.params.id} not exist`
    })
  }
}

const deleteUser = (req: Request, res: Response) => {
  console.log(req.params.id);
  console.log(typeof cache.get(req.params.id));

  const user: object | undefined = cache.get(req.params.id);
  cache.set(
    req.params.id,
    {
      ...user,
      isDeleted: true,
    },
    1000
  )

  res.send(`User with id:${req.params.id} was deleted`);
}

const getAllUsers = (req: Request<any, any, any, UserListRequest>, res: Response) => {
  console.log(req.query);

  const { limit, login } = req.query;
  const keys = cache.keys();
  const userList: User[] = [];
  keys.forEach(key => {
    const user: User | undefined = cache.get(key);
    if (user?.login.includes(login)) {
      userList.push(user);
    }
  });

  console.log(userList);

  res.send(userList.sort((a,b) => a.login > b.login ? 1 : -1).slice(0 , limit));
}

const createUser = (req: Request, res: Response) => {
  cache.set(req.body.id, req.body, 1000)
  console.log(cache.keys(), cache.has(req.body.id));
  res.send(`User with id:${req.body.id} was added`);
}

const updateUser = (req: Request, res: Response) => {
  cache.set(req.body.id, req.body, 1000)
  console.log(cache.keys(), cache.has(req.body.id));
  res.send(`User with id:${req.body.id} was updated`);
}

export {
  defaultRoot,
  getUserById,
  deleteUser,
  getAllUsers,
  createUser,
  updateUser,
}
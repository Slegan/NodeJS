import { Router, Request, Response, NextFunction } from "express";
import HttpException from "../handlers/exceptions/HttpException";

import Controller from "../interfaces/controller";
import GroupService from "../services/GroupService";
import authMiddleware from "../handlers/auth/authMiddleWare";

class GroupController implements Controller {
  path = '/groups';
  router = Router();
  groupService: GroupService;

  constructor(groupService: GroupService) {
    this.groupService = groupService;
    this.initRouters()
  }

  initRouters() {
    this.router.get(`${this.path}`, authMiddleware(), this.getGroups);
    this.router.post(`${this.path}`, authMiddleware(),  this.createGroup);
    this.router.put(`${this.path}`, authMiddleware(), this.updateGroup);
    this.router.post(`${this.path}/addUsersToGroup`, authMiddleware(), this.addUsersToGroup);
    this.router.get(`${this.path}/:id`, authMiddleware(), this.getGroupById);
    this.router.delete(`${this.path}/:id`, authMiddleware(), this.deleteGroup);
  }

  getGroups = async (req: Request, res: Response, next: NextFunction) => {
    await this.groupService.getGroups()
      .then((groups: any) => {
        res.status(200).json(groups.rows)
      })
      .catch((error: Error) => {
        next(new HttpException(404, String(error), 'getGroups'));
      })
  }

  getGroupById = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    await this.groupService.getGroupById(id)
      .then((groups: any) => {
        res.status(200).json(groups.rows)
      })
      .catch((error: Error) => {
        next(new HttpException(404, `group with id ${id} not exist, ${error}`, 'getGroupById'));
      })
  }

  createGroup = async (req: Request, res: Response, next: NextFunction) => {
    const { id, name, permissions } = req.body;
  
    await this.groupService.createGroup( id, name, permissions )
      .then((groups: any) => {
        res.status(201).send(`group added with ID: ${groups?.rows[0].id}`)
      })
      .catch((error: Error) => {
        next(new HttpException(400, `group with params ${id}, ${name}, ${permissions} not created, ${error}`, 'createGroup'));
      })
  }

  updateGroup = async (req: Request, res: Response, next: NextFunction) => {
    const { id, name, permissions } = req.body;

    await this.groupService.updateGroup(id, name, permissions)
      .then((groups: any) => {
        res.status(200).send(`group modified with ID: ${id}`)
      })
      .catch((error: Error) => {
        next(new HttpException(400, `group with params ${id}, ${name}, ${permissions} not updated, ${error}`, 'updateGroup'));
      })
  }

  deleteGroup = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);

    await this.groupService.deleteGroup(id)
      .then(() => {
        res.status(200).send(`group deleted with ID: ${id}`)
      })
      .catch((error: Error) => {
        next(new HttpException(400, `group not deleted, ${error}`, 'deleteGroup'));
      })
  }

  addUsersToGroup = async (req: Request, res: Response, next: NextFunction) => {
    const { users_id, group_id } = req.body;

    await this.groupService.addUsersToGroup(users_id, group_id)
      .then(() => {
        res.status(200).send(`user with ID: ${users_id} added to group with ID: ${group_id}`)
      })
      .catch((error: Error) => {
        next(new HttpException(400, `user not added to the group, ${error}`, 'addUsersToGroup'));
      })
  }
}

export default GroupController;

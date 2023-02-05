import { Router, Request, Response  } from "express";

import Controller from "../interfaces/controller";
import GroupService from '../services/GroupService'

class GroupController implements Controller {
  path = '/groups';
  router = Router();
  groupService: GroupService;

  constructor(groupService: GroupService) {
    this.groupService = groupService;
    this.initRouters()
  }

  initRouters() {
    this.router.get(`${this.path}`, this.getGroups);
    this.router.post(`${this.path}`,  this.createGroup);
    this.router.put(`${this.path}`, this.updateGroup);
    this.router.post(`${this.path}/addUsersToGroup`, this.addUsersToGroup);
    this.router.get(`${this.path}/:id`, this.getGroupById);
    this.router.delete(`${this.path}/:id`, this.deleteGroup);
  }

  getGroups = async (req: Request, res: Response) => {
    await this.groupService.getGroups()
      .then((groups: any) => {
        res.status(200).json(groups.rows)
      })
      .catch((error: Error) => {
        res.status(404).json({
          message: `groups not exist, ${error}`
        })
      })
  }

  getGroupById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    await this.groupService.getGroupById(id)
      .then((groups: any) => {
        res.status(200).json(groups.rows)
      })
      .catch((error: Error) => {
        res.status(404).json({
          message: `group with id ${id} not exist, ${error}`
        })
      })
  }

  createGroup = async (req: Request, res: Response) => {
    const { id, name, permissions } = req.body;
  
    await this.groupService.createGroup( id, name, permissions )
      .then((groups: any) => {
        res.status(201).send(`group added with ID: ${groups?.rows[0].id}`)
      })
      .catch((error: Error) => {
        res.status(400).json({
          message: `group not created, ${error}`
        })
      })
  }

  updateGroup = async (req: Request, res: Response) => {
    const { id, name, permissions } = req.body;

    await this.groupService.updateGroup(id, name, permissions)
      .then((groups: any) => {
        res.status(200).send(`group modified with ID: ${id}`)
      })
      .catch((error: Error) => {
        res.status(400).json({
          message: `group not updated, ${error}`
        })
      })
  }

  deleteGroup = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    await this.groupService.deleteGroup(id)
      .then(() => {
        res.status(200).send(`group deleted with ID: ${id}`)
      })
      .catch((error: Error) => {
        res.status(400).json({
          message: `group not deleted, ${error}`
        })
      })
  }

  addUsersToGroup = async (req: Request, res: Response) => {
    const { users_id, group_id } = req.body;

    console.log(users_id, group_id,typeof users_id, typeof group_id);
    
    

    await this.groupService.addUsersToGroup(users_id, group_id)
      .then(() => {
        res.status(200).send(`user with ID: ${users_id} added to group with ID: ${group_id}`)
      })
      .catch((error: Error) => {
        res.status(400).json({
          message: `user not added to the group, ${error}`
        })
      })
  }
}

export default GroupController;

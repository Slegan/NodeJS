import { Request, Response, NextFunction } from "express";
import { groups, mock } from "../models/__mocks__";
import constants from "../config/constants";
import "regenerator-runtime/runtime";

import GroupController from "../controllers/GroupController";

describe("Group Controller", () => {
  let groupService = {
    getGroups: jest.fn(),
    getGroupById: jest.fn(),
    createGroup: jest.fn(),
    updateGroup: jest.fn(),
    deleteGroup: jest.fn(),
    addUsersToGroup: jest.fn(),
  };

  const request = mock.request();
  const response = mock.response();
  const next = mock.next();

  afterEach(() => {
    jest.clearAllMocks();
  })

  it("Get All Groups", async () => {
    groupService = {
      ...groupService,
      getGroups: jest.fn().mockResolvedValue({rows: groups}),
    };

    await new GroupController(groupService).getGroups(
      request as unknown as Request,
      response as unknown as Response,
      next
    );

    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith(groups);
  });

  it("Get Group by ID", async () => {
    groupService = {
      ...groupService,
      getGroupById: jest.fn().mockResolvedValue({rows: groups[0]}),
    };

    await new GroupController(groupService).getGroupById(
      { params: { id: groups[0].id }}as unknown as Request,
      response as unknown as Response,
      next
    );

    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith(groups[0]);
  });

  it("Create Group", async () => {
    const newGroup = {
      body: {
        id: "12312313",
        permissions: ["DELETE", "SHARE", "READ", "UPLOAD_FILES", "WRITE"],
        name: "MODERATOR",
      }
    };

    groupService = {
      ...groupService,
      createGroup: jest.fn().mockResolvedValue({rows: groups}),
    };

    await new GroupController(groupService).createGroup(
      newGroup as unknown as Request,
      response as unknown as Response,
      next
    );

    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith(`${constants.GROUP_CREATED} ${newGroup.body.id}`);
  });

  it("Update Group", async () => {
    const updatedGroup = {
      body: {
        id: "12312313",
        permissions: ["DELETE", "SHARE", "READ"],
        name: "MODERATOR",
      }
    };

    groupService = {
      ...groupService,
      updateGroup: jest.fn().mockResolvedValue({rows: groups}),
    };

    await new GroupController(groupService).updateGroup(
      updatedGroup as unknown as Request,
      response as unknown as Response,
      next
    );

    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith(`${constants.GROUP_UPDATED} ${updatedGroup.body.id}`);
  });

  it("Delete Group", async () => {
    groupService = {
      ...groupService,
      deleteGroup: jest.fn().mockResolvedValue({rows: groups[0]}),
    };

    await new GroupController(groupService).deleteGroup(
      { params: { id: groups[0].id }} as unknown as Request,
      response as unknown as Response,
      next
    );

    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith(`${constants.GROUP_DELETED} ${groups[0].id}`);
  });

  it("Add Users to Group", async () => {
    const updatedGroup = {
      body: {
        id: "12312313",
        users_id: ["userId_1", "userId_2", "userId_3"],
        group_id: "MODERATOR",
      }
    };

    groupService = {
      ...groupService,
      addUsersToGroup: jest.fn().mockResolvedValue({rows: groups[0]}),
    };

    await new GroupController(groupService).addUsersToGroup(
      updatedGroup as unknown as Request,
      response as unknown as Response,
      next
    );

    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith(`${constants.GROUP_ADDED_TO} ${updatedGroup.body.users_id} ${constants.GROUP_ADDED_TO} ${updatedGroup.body.group_id}`);
  });
});

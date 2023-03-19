import { groups, mock } from "../models/__mocks__";
import { Request, Response, NextFunction } from "express";
import "regenerator-runtime/runtime";
import GroupController from "../controllers/GroupController";

describe("Group Controller", () => {
  it("Get All Groups", async () => {
    // const request = mock.request<typeof Request>();
    const request = mock.request();
    const response = mock.response();
    const next = mock.next();

    const groupService = {
      getGroups: jest.fn().mockResolvedValue(groups),
      getGroupById: jest.fn(),
      createGroup: jest.fn(),
      updateGroup: jest.fn(),
      deleteGroup: jest.fn(),
      addUsersToGroup: jest.fn(),
    };

    await new GroupController(groupService).getGroups(request, response, next);

    expect(response.send).toHaveBeenCalledTimes(1);
    expect(response.send).toHaveBeenCalledWith(groups);
  });

  it("Get Group by ID", async () => {
    const request = mock.request();
    const response = mock.response();
    const next = mock.next();

    request.params.id = jest.fn().mockResolvedValue(groups[0].id);

    const groupService = {
      getGroupById: jest.fn().mockResolvedValue(groups[0]),
      getGroups: jest.fn(),
      createGroup: jest.fn(),
      updateGroup: jest.fn(),
      deleteGroup: jest.fn(),
      addUsersToGroup: jest.fn(),
    };

    await new GroupController(groupService).getGroupById(
      request,
      response,
      next
    );

    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith(groups[0]);
  });

  it("Get Group by ID", async () => {
    const request = mock.request();
    const response = mock.response();
    const next = mock.next();

    request.params.id = jest.fn().mockResolvedValue(groups[0].id);

    const groupService = {
      getGroupById: jest.fn().mockResolvedValue(undefined),
      getGroups: jest.fn(),
      createGroup: jest.fn(),
      updateGroup: jest.fn(),
      deleteGroup: jest.fn(),
      addUsersToGroup: jest.fn(),
    };

    await new GroupController(groupService).getGroupById(
      request,
      response,
      next
    );

    expect(response.status).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledWith(404);
  });

  it("Create Group", async () => {
    const request = mock.request();
    const response = mock.response();
    const next = mock.next();

    const newGroup = {
      id: "123_123_123",
      permissions: ["DELETE", "SHARE", "READ", "UPLOAD_FILES", "WRITE"],
      name: "MODERATOR",
    };

    request.body = jest.fn().mockResolvedValue(newGroup);

    const groupService = {
      createGroup: jest.fn().mockResolvedValue(groups[0]),
      getGroups: jest.fn(),
      getGroupById: jest.fn(),
      updateGroup: jest.fn(),
      deleteGroup: jest.fn(),
      addUsersToGroup: jest.fn(),
    };

    await new GroupController(groupService).createGroup(
      request,
      response,
      next
    );

    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith(groups[0]);
  });

  it("Update Group", async () => {
    const request = mock.request();
    const response = mock.response();
    const next = mock.next();

    request.params.groupId = jest.fn().mockResolvedValue(groups[0].id);
    request.body = jest.fn().mockResolvedValue(groups[0]);

    const groupService = {
      updateGroupById: jest.fn().mockResolvedValue(1),
      getGroups: jest.fn(),
      createGroup: jest.fn(),
      updateGroup: jest.fn(),
      deleteGroup: jest.fn(),
      addUsersToGroup: jest.fn(),
      getGroupById: jest.fn(),
    };

    await new GroupController(groupService).updateGroup(
      request,
      response,
      next
    );

    expect(response.json).toHaveBeenCalledTimes(1);
  });

  it("Delete Group", async () => {
    const request = mock.request();
    const response = mock.response();
    const next = mock.next();

    request.params.groupId = jest.fn().mockResolvedValue(groups[0].id);

    const groupService = {
      deleteGroupById: jest.fn().mockResolvedValue(groups[0]),
      getGroups: jest.fn(),
      createGroup: jest.fn(),
      updateGroup: jest.fn(),
      deleteGroup: jest.fn(),
      addUsersToGroup: jest.fn(),
      getGroupById: jest.fn(),
    };

    await new GroupController(groupService).deleteGroup(
      request,
      response,
      next
    );

    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith(groups[0]);
  });

  it("Add Users to Group", async () => {
    const request = mock.request();
    const response = mock.response();
    const next = mock.next();

    const userIds = ["userId_1", "userId_2", "userId_3"];

    request.params.groupId = jest.fn().mockResolvedValue(groups[0].id);
    request.body = jest.fn().mockResolvedValue(userIds);

    const groupService = {
      addUsersToGroup: jest.fn().mockResolvedValue(groups[0]),
      getGroups: jest.fn(),
      createGroup: jest.fn(),
      updateGroup: jest.fn(),
      deleteGroup: jest.fn(),
      getGroupById: jest.fn(),
    };

    await new GroupController(groupService).addUsersToGroup(
      request,
      response,
      next
    );

    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith(groups[0]);
  });
});

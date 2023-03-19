import { groups, mock } from "../models/__mocks__";
import "regenerator-runtime/runtime";
import GroupController from "../controllers/GroupController";

describe("Group Controller", () => {
  it("Get All Groups", async () => {
    const request = mock.request();
    const response = mock.response();

    const groupService = {
      getGroups: jest.fn().mockResolvedValue(groups),
    };

    await new GroupController(groupService).getAllGroups(request, response);

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
      permissions: ["DELETE", "SHARE", "READ", "UPLOAD_FILES", "WRITE"],
      name: "MODERATOR",
    };

    request.body = jest.fn().mockResolvedValue(newGroup);

    const groupService = {
      createGroup: jest.fn().mockResolvedValue(groups[0]),
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
    };

    await new GroupController(groupService).updateGroupById(
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
    };

    await new GroupController(groupService).deleteGroupById(
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

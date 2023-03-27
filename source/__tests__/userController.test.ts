import { Request, Response, NextFunction } from "express";
import { mock, users } from "../models/__mocks__";
import "regenerator-runtime/runtime";
import constants from "../config/constants";

import UserController from "../controllers/UserController";

describe("UserController", () => {
  let userService = {
    getUsers: jest.fn(),
    getUserById: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
    createDefaultUsers: jest.fn(),
    getUserByLoginAndPassword: jest.fn(),
  };

  const request = mock.request();
  const response = mock.response();
  const next = mock.next();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Get All Users", async () => {

    userService = {
      ...userService,
      getUsers: jest.fn().mockResolvedValue({ rows: users }),
    };

    await new UserController(userService).getUsers(
      request as unknown as Request,
      response as unknown as Response,
      next
    );

    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith(users);
  });

  it("Create new User", async () => {
    const newUser = {
      body: {
        age: '11',
        id: '3241512',
        isDeleted: false,
        login: 'Test Login 1',
        password: '123QWERTYU',
      },
    };

    userService = {
      ...userService,
      createUser: jest.fn().mockResolvedValue({ rows: users }),
    };

    await new UserController(userService).createUser(
      newUser as unknown as Request,
      response as unknown as Response,
      next
    );

    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith(`${constants.USER_CREATED} ${users[0].id}`);
  });

  it("Get User by ID", async () => {
    userService = {
      ...userService,
      getUserById: jest.fn().mockResolvedValue({ rows: users[0] }),
    };

    await new UserController(userService).getUserById(
      {params: { id: users[0].id }} as unknown as Request,
      response as unknown as Response,
      next
    );

    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith(users[0]);
  });

  it("Update User by ID", async () => {
    const updatedUser = {
      body: {
        age: '11',
        id: '3241512',
        isDeleted: false,
        login: 'Test Login 1',
        password: '123QWERTYU',
      },
    };

    userService = {
      ...userService,
      updateUser: jest.fn().mockResolvedValue({ rows: users }),
    };

    await new UserController(userService).updateUser(
      updatedUser as unknown as Request,
      response as unknown as Response,
      next
    );

    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith(`${constants.USER_UPDATED} ${users[0].id}`);
  });

  it("Delete User", async () => {
    userService = {
      ...userService,
      deleteUser: jest.fn().mockResolvedValue({ rows: users[0] }),
    };

    await new UserController(userService).deleteUser(
      {params: { id: users[0].id }} as unknown as Request,
      response as unknown as Response,
      next
    );

    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith(`${constants.USER_DELETED} ${users[0].id}`);
  });

  it("Get Auto Suggest Users", async () => {
    userService = {
      ...userService,
      createDefaultUsers: jest.fn().mockResolvedValue({ rows: users }),
    };

    await new UserController(userService).createDefaultUsers(
      request as unknown as Request,
      response as unknown as Response,
      next
    );

    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith(`${constants.USER_DEFAULT}`);
  });
});

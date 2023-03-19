import { jest } from '@jest/globals';
import { Request, Response, NextFunction } from "express";

export const mock = {
    request: () => ({
        body: jest.fn().mockReturnThis(),
        params: jest.fn().mockReturnThis(),
        query: jest.fn().mockReturnThis()
    }),
    response: () => ({
        send: jest.fn().mockReturnThis(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
    }),
    next: () => jest.fn().mockReturnThis()
};

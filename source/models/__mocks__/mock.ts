import { jest } from '@jest/globals';

export const mock = {
    response: () => ({
        send: jest.fn().mockReturnThis(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
    }),
    next: () => jest.fn().mockReturnThis()
};

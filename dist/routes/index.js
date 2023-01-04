"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const node_cache_1 = __importDefault(require("node-cache"));
const express_joi_validation_1 = require("express-joi-validation");
const validation_1 = require("../schemas/validation");
const router = (0, express_1.Router)();
const cache = new node_cache_1.default();
const validator = (0, express_joi_validation_1.createValidator)();
router
    .get('/', (req, res) => {
    res.send('Hello, please use /users to get more info');
});
router
    .get('/users/:id', (req, res) => {
    console.log(cache.has(req.params.id), req.params.id);
    res.send(cache.get(req.params.id));
})
    .delete('/users/:id', (req, res) => {
    console.log(req.params.id);
    console.log(typeof cache.get(req.params.id));
    const user = cache.get(req.params.id);
    cache.set(req.params.id, Object.assign(Object.assign({}, user), { isDeleted: true }), 1000);
    res.send(`User with id:${req.params.id} was deleted`);
});
router
    .post('/users/create', validator.body(validation_1.UserSchema), (req, res) => {
    cache.set(req.body.id, req.body, 1000);
    console.log(cache.keys(), cache.has(req.body.id));
    res.send(`User with id:${req.body.id} was added`);
});
router
    .get('/users', (req, res) => {
    console.log(req.query);
    const { limit, login } = req.query;
    const keys = cache.keys();
    const userList = [];
    keys.forEach(key => {
        const user = cache.get(key);
        if (user === null || user === void 0 ? void 0 : user.login.includes(login)) {
            userList.push(user);
        }
    });
    console.log(userList);
    res.send(userList.sort((a, b) => a.login > b.login ? 1 : -1).slice(0, limit));
});
exports.default = router;

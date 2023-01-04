"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
const UsersList = [];
router
    .get('/', (req, res) => {
    res.send('Hello, please use /users to get more info');
});
router
    .get('/users/:id', (req, res) => {
    console.log(UsersList.has(req.params.id));
    res.send(UsersList.get(req.params.id));
})
    .delete('/users/:id', (req, res) => {
    console.log(req.params.id);
    console.log(UsersList.get(req.params.id));
    res.send(UsersList.get(req.params.id));
});
router
    .post('/users/create', (req, res) => {
    UsersList.set(req.body.id, req.body);
    console.log(UsersList.size, UsersList.has(req.body.id));
    res.send(`User with id:${req.body.id} was added`);
});
router
    .get('/users', (req, res) => {
    console.log(req.query);
    res.send(req.query);
});

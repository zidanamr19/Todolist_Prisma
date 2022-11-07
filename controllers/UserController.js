// Mapping function dari module ke API
const m$user = require('../modules/user.module');
const { Router } = require('express');
const response = require('../helpers/response');

const UserController = Router();

// https://localhost:8000/api/users

UserController.get('/', async (req, res) => {
  const list = await m$user.listUser();

  // response helper
  response.sendResponse(res, list);
});

UserController.post('/', async (req, res) => {
  const add = await m$user.createUser(req.body);

  // response helper
  response.sendResponse(res, add);
});

UserController.put('/', async (req, res) => {
  const update = await m$user.updateUser(req.body);

  // response helper
  response.sendResponse(res, update);
});

/**
 *
 * @param {number} id
 *
 * */ //localhost:8000/api/users

https: UserController.delete('/:id', async (req, res) => {
  const del = await m$user.deleteUser(Number(req.params.id));

  // response helper
  response.sendResponse(res, del);
});

module.exports = UserController;

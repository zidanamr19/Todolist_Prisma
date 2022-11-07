const m$todo = require('../modules/todo.module');
const { Router } = require('express');
const response = require('../helpers/response');

const TodoController = Router();

/** 
* Read Todo
* @param {number} user_id
* @param {string} description
* @param {number} completed
// http://localhost:8000/api/todo
*/
TodoController.get('/', async (req, res) => {
  const list = await m$todo.listTodo();

  // Response helper
  response.sendResponse(res, list);
});

/** 
* Create Todo
* @param {number} user_id
* @param {string} description
* @param {number} completed
// http://localhost:8000/api/todo
*/
TodoController.post('/', async (req, res) => {
  // Req body berisi data yg dikirim dari client
  const add = await m$todo.createTodo(req.body);

  response.sendResponse(res, add);
});

/** 
* Update Todo
* @param {number} id
* @param {number} user_id
* @param {string} description
* @param {number} completed
// http://localhost:8000/api/users
*/
TodoController.put('/', async (req, res) => {
  // Req body berisi data yg dikirim dari client
  const update = await m$todo.updateTodo(req.body);

  response.sendResponse(res, update);
});

/** 
* Delete Todo
* @param {number} id
// http://localhost:8000/api/users/:id
*/
TodoController.delete('/:id', async (req, res) => {
  // Req params
  const del = await m$todo.deleteTodo(Number(req.params.id));

  response.sendResponse(res, del);
});

module.exports = TodoController;

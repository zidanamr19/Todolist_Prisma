const AuthController = require('./controllers/AuthController');
const TodoController = require('./controllers/TodoController');
const UserController = require('./controllers/UserController');

const _routes = [
  // http://localhost:8000/api/users
  ['users', UserController],
  // http://localhost:8000/api/login
  ['', AuthController],
  ['todo', TodoController],
];

const routes = (app) => {
  _routes.forEach((route) => {
    const [url, controller] = route;

    // http://localhost:8000/api
    app.use(`/api/${url}`, controller);
  });
};

module.exports = routes;

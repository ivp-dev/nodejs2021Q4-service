const { getUsers, putUser, postUser, deleteUser, getUser } = require('./user.controller');
const opts = require('./user.opts.json');



function userRoutes(app, options, done) {

  app.get('/users', opts.getUsers, getUsers);
  app.get('/users/:userId', opts.getUser, getUser);
  app.put('/users/:userId', opts.putUser, putUser);
  app.post('/users', opts.postUser, postUser);
  app.delete('/users/:userId', opts.deleteUser, deleteUser)

  done();
}

module.exports = userRoutes;

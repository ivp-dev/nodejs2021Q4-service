const { getTasks, putTask, postTask, deleteTask, getTask } = require('./task.controller');
const opts = require('./task.opts.json');

function taskRoutes(app, options, done) {

  app.get('/boards/:boardId/tasks', opts.getTasks, getTasks);
  app.get('/boards/:boardId/tasks/:taskId', opts.getTask, getTask);
  app.put('/boards/:boardId/tasks/:taskId', opts.putTask, putTask);
  app.post('/boards/:boardId/tasks', opts.postTask, postTask);
  app.delete('/boards/:boardId/tasks/:taskId', opts.deleteTask, deleteTask)

  done();
}

module.exports = taskRoutes;

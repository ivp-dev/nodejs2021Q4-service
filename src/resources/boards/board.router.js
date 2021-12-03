const { getBoards, putBoard, postBoard, deleteBoard, getBoard } = require('./board.controller');
const opts = require('./board.opts.json');

function boardRoutes(app, options, done) {

  app.get('/boards', opts.getBoards, getBoards);
  app.get('/boards/:boardId', opts.getBoard, getBoard);
  app.put('/boards/:boardId', opts.putBoard, putBoard);
  app.post('/boards', opts.postBoard, postBoard);
  app.delete('/boards/:boardId', opts.deleteBoard, deleteBoard)

  done();
}

module.exports = boardRoutes;

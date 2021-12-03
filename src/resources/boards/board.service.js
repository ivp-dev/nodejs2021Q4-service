const boardsRepo = require('./board.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');
const boardRoutes = require('./board.router');

const getAll = () => boardsRepo.getAll();

const getById = async (id) => boardsRepo.getById(id);

const getIndexById = async (id) => boardsRepo.getById(id);

const addBoard = async (board) => {
  const newBoard = await boardsRepo.createBoard(board);
  await boardsRepo.addBoard(newBoard);
  return newBoard;
}

const updateBoard = async (id, board) => {  
  const updatedBoard = await boardsRepo.updateBoardById(id, board);
  return updatedBoard;
}

const deleteBoard = async (id) => {
  const result = await boardsRepo.deleteBoard(id);

  if(result > 0) {
    await tasksRepo.deleteBoardTasks(id);
  }

  return result;
}

module.exports = { getAll, getById, addBoard, updateBoard, deleteBoard };

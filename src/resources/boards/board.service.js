const boardsRepo = require('./board.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

const getAll = () => boardsRepo.getAll();

const getById = async (id) => {
  const result = await boardsRepo.getById(id);
  return result;
};

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
  await Promise.all([
    boardsRepo.deleteBoard(id),
    tasksRepo.deleteBoardTasks(id)
  ]);
}

module.exports = { getAll, getById, addBoard, updateBoard, deleteBoard };

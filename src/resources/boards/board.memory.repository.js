const { v4: uuidv4 } = require('uuid');
const state = require('../../state');

const getAll = async () => state.boards

const getById = async (id) => {
  const board = state.boards.find(b => b.id === id);
  return board;
}

const createBoard = async (data) => {
  const newBoard = {
    ...data, id: uuidv4(), columns: data.columns?.map(column => ({
      ...column, id: uuidv4()
    }))
  }

  return newBoard;
}

const addBoard = async (board) => {
  state.boards.push(board);
}

const updateBoardById = async (id, boardData) => {
  const boardIndex = state.boards.findIndex(u => u.id === id);

  if (boardIndex === -1) {
    return null;
  }

  const targetBoard = state.boards[boardIndex];
  const updatedBoard = { ...targetBoard, ...boardData, id: targetBoard.id };
  state.boards.splice(boardIndex, 1, updatedBoard);

  return updatedBoard;
}

const deleteBoard = async (id) => {
  const boardIndex = state.boards.findIndex(b => b.id === id);

  if (boardIndex !== -1) {
    state.boards.splice(boardIndex, 1);
  }
}

module.exports = {
  getAll,
  getById,
  addBoard,
  deleteBoard,
  createBoard,
  updateBoardById
};

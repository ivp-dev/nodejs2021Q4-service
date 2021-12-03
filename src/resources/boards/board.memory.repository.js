const { v4: uuidv4 } = require('uuid');
const state = require('../../state');

const getAll = async () => state.boards

const getById = async (id) => {
  const board = state.boards.find(board => board.id === id);
  return board;
}

const getIndexById = async (id) => state.boards.findIndex((u => u.id === id));

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
    return;
  }

  const targetBoard = state.boards[boardIndex];
  const updatedBoard = { ...targetBoard, ...boardData, id: targetBoard.id }; //Id needed to avoid overriding with incoming id
  state.boards.splice(boardIndex, 1, updatedBoard);

  return updatedBoard;
}

const deleteBoard = async (id) => {
  const boardIndex = state.boards.findIndex(b => b.id === id);

  if (boardIndex === -1) {
    return boardIndex;
  }

  state.boards.splice(boardIndex, 1);

  return 1;
}

module.exports = {
  getAll,
  getById,
  addBoard,
  deleteBoard,
  createBoard,
  updateBoardById
};

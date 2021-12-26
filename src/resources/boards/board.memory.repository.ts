import { v4 as uuidv4 } from 'uuid';
import state from '../../state';
import { BoardModel } from '../../types';

/**
 * Get all boards route controller
 * @returns Promise list of boards
 */
const getAll = async (): Promise<BoardModel[]> => state.boards;

/**
 * Get boared by id route controller
 * @param id - Board identifier
 * @returns Promise Board
 */
const getById = async (id: string): Promise<BoardModel | undefined> => {
  const board = state.boards.find((b) => b.id === id);
  return board;
};

/**
 * Create new board route controller
 * @param boardData - Board data
 * @returns Promise Board
 */
const createBoard = async (boardData: BoardModel): Promise<BoardModel> => {
  const newBoard = {
    ...boardData,
    id: uuidv4(),
    columns: boardData.columns?.map((column) => ({
      ...column,
      id: uuidv4(),
    })),
  };

  return newBoard;
};

/**
 * Store board route controller
 * @param board - Board
 * @returns Promise void
 */
const addBoard = async (board: BoardModel): Promise<void> => {
  state.boards.push(board);
};

/**
 * Update board route controller
 * @param id - Board identifier
 * @param boardData - Board data
 * @returns Promise Board 
 */
const updateBoardById = async (
  id: string,
  boardData: BoardModel
): Promise<BoardModel | null> => {
  const boardIndex = state.boards.findIndex((u) => u.id === id);

  if (boardIndex === -1) {
    return null;
  }

  const targetBoard = state.boards[boardIndex];
  const updatedBoard = { ...targetBoard, ...boardData, id: targetBoard.id };
  state.boards.splice(boardIndex, 1, updatedBoard);

  return updatedBoard;
};

/**
 * Delete board route controller
 * @param id - Board identifier
 * @returns Promise void
 */
const deleteBoard = async (id: string): Promise<void> => {
  const boardIndex = state.boards.findIndex((b) => b.id === id);

  if (boardIndex !== -1) {
    state.boards.splice(boardIndex, 1);
  }
};

export default {
  getAll,
  getById,
  addBoard,
  deleteBoard,
  createBoard,
  updateBoardById,
};

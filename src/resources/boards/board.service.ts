import boardsRepo from './board.memory.repository';
import tasksRepo from '../tasks/task.memory.repository';
import { BoardModel } from '../../types';

/**
 * Get all boards
 * @returns List of boards
 */
const getAll = (): Promise<BoardModel[]> => boardsRepo.getAll();

/**
 * Get board
 * @param id Board identifier
 * @returns Board
 */
const getById = async (id: string): Promise<BoardModel | undefined> => {
  const result = await boardsRepo.getById(id);
  return result;
};

/**
 * Store board
 * @param boardData Board data
 * @returns Board
 */
const addBoard = async (boardData: BoardModel): Promise<BoardModel> => {
  const newBoard = await boardsRepo.createBoard(boardData);
  await boardsRepo.addBoard(newBoard);
  return newBoard;
}

/**
 * Update board
 * @param id Board identifier
 * @param boardData Board data
 * @returns Board
 */
const updateBoard = async (id: string, boardData: BoardModel): Promise<BoardModel | null> => {
  const updatedBoard = await boardsRepo.updateBoardById(id, boardData);
  return updatedBoard;
}

/**
 * Delete board
 * @param id Board identifier
 */
const deleteBoard = async (id: string): Promise<void> => {
  await Promise.all([
    boardsRepo.deleteBoard(id),
    tasksRepo.deleteBoardTasks(id)
  ]);
}

export default { getAll, getById, addBoard, updateBoard, deleteBoard };

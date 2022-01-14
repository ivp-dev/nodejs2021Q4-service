import boardsRepo from './board.memory.repository';
import { BoardModel } from '../../types';
import BoardRepository from './board.repository';
import { uow } from '../../common/unit-of-work';
import { getCustomRepository } from "typeorm";

/**
 * Get all boards
 * @returns Promise List of boards
 */
const getAll = async (): Promise<BoardModel[]> => {
  const repository = getCustomRepository(BoardRepository);
  return await repository.getBoards();
};

/**
 * Get board
 * @param id - Board identifier
 * @returns Promise Board or undefined
 */
const getById = async (id: string): Promise<BoardModel | undefined> => {
  const repository = getCustomRepository(BoardRepository);
  const result = await repository.getBoardById(id);
  return result;
};

/**
 * Store board
 * @param boardData - Board data
 * @returns Promise Board
 */
const addBoard = async (boardData: BoardModel): Promise<BoardModel> => {
  return await uow(BoardRepository, async (repository) => {
    const board = await repository.createBoard(boardData);
    return board;
  });
};

/**
 * Update board
 * @param id - Board identifier
 * @param boardData - Board data
 * @returns Promise Board or null
 */
const updateBoard = async (
  id: string,
  boardData: BoardModel
): Promise<BoardModel | undefined> => {
  return await uow(BoardRepository, async (repository) => {
    const board = await repository.updateBoardById(id, boardData);
    return board;
  });
};

/**
 * Delete board
 * @param id - Board identifier
 * @returns Promise void
 */
const deleteBoard = async (id: string): Promise<void> => {
  await uow(BoardRepository, async (repository) => {
    await repository.deleteBoard(id);
  });
};

export default { getAll, getById, addBoard, updateBoard, deleteBoard };

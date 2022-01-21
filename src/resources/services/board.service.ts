import { getCustomRepository } from 'typeorm';
import { boardRepository } from '../repositories';
import { uow } from '../../common/unit-of-work';
import { BoardEntity } from '../entities';

/**
 * Get all boards
 * @returns Promise List of boards
 */
export const getAll = async (): Promise<BoardEntity[]> => {
  const repository = getCustomRepository(boardRepository);
  const result = await repository.getBoards();
  return result;
};

/**
 * Get board
 * @param id - Board identifier
 * @returns Promise Board or undefined
 */
export const getById = async (id: string): Promise<BoardEntity | undefined> => {
  const repository = getCustomRepository(boardRepository);
  const result = await repository.getBoardById(id);
  return result;
};

/**
 * Store board
 * @param boardData - Board data
 * @returns Promise Board
 */
export const addBoard = async (
  boardData: BoardEntity
): Promise<BoardEntity> => {
  const result = await uow(boardRepository, async (repository) => {
    const board = await repository.createBoard(boardData);
    return board;
  });

  return result;
};

/**
 * Update board
 * @param id - Board identifier
 * @param boardData - Board data
 * @returns Promise Board or null
 */
export const updateBoard = async (
  id: string,
  boardData: BoardEntity
): Promise<BoardEntity | undefined> => {
  const result = await uow(boardRepository, async (repository) => {
    const board = await repository.updateBoardById(id, boardData);
    return board;
  });

  return result;
};

/**
 * Delete board
 * @param id - Board identifier
 * @returns Promise void
 */
export const deleteBoard = async (id: string): Promise<void> => {
  await uow(boardRepository, async (repository) => {
    await repository.deleteBoard(id);
  });
};

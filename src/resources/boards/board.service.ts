import { getCustomRepository } from "typeorm";
import BoardRepository from './board.repository';
import { uow } from '../../common/unit-of-work';
import BoardEntity from './board.entity';

/**
 * Get all boards
 * @returns Promise List of boards
 */
export const getAll = async (): Promise<BoardEntity[]> => {
  const repository = getCustomRepository(BoardRepository);
  const result = await repository.getBoards();
  return result;
};

/**
 * Get board
 * @param id - Board identifier
 * @returns Promise Board or undefined
 */
export const getById = async (id: string): Promise<BoardEntity | undefined> => {
  const repository = getCustomRepository(BoardRepository);
  const result = await repository.getBoardById(id);
  return result;
};

/**
 * Store board
 * @param boardData - Board data
 * @returns Promise Board
 */
export const addBoard = async (boardData: BoardEntity): Promise<BoardEntity> => {
  const result = await uow(BoardRepository, async (repository) => {
    const board = await repository.createBoard(boardData);
    return board;
  });

  return result;
}

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
  const result = await uow(BoardRepository, async (repository) => {
    const board = await repository.updateBoardById(id, boardData);
    return board;
  });

  return result;
}

/**
 * Delete board
 * @param id - Board identifier
 * @returns Promise void
 */
export const deleteBoard = async (id: string): Promise<void> => {
  await uow(BoardRepository, async (repository) => {
    await repository.deleteBoard(id);
  });
};

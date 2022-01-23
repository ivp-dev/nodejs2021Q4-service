import { DeepPartial, EntityRepository } from 'typeorm';
import { BoardEntity } from '../entities';
import BaseRepository from '../../common/base-repository';

@EntityRepository(BoardEntity)
class BoardRepository extends BaseRepository {
  /**
   * Get all boards route controller
   * @returns Promise list of boards
   */
  getBoards = async (): Promise<BoardEntity[]> => {
    const result = await this.manager.find(BoardEntity, {
      relations: ['columns'],
    });
    return result;
  };

  /**
   * Get board by id
   * @param id - Board identifier
   * @returns Promise Board
   */
  getBoardById = async (id: string): Promise<BoardEntity | undefined> => {
    const board = await this.manager.findOne(BoardEntity, {
      where: { id },
      relations: ['columns'],
    });
    return board;
  };

  /**
   * Create new board route controller
   * @param boardData - Board data
   * @returns Promise Board
   */
  createBoard = async (boardData: DeepPartial<BoardEntity>): Promise<BoardEntity> => {
    const newBoard = this.manager.create(BoardEntity, boardData);
    await this.manager.save(newBoard);
    return newBoard;
  };

  /**
   * Update board route controller
   * @param id - Board identifier
   * @param boardData - Board data
   * @returns Promise Board
   */
  updateBoardById = async (
    id: string,
    boardData: BoardEntity
  ): Promise<BoardEntity | undefined> => {
    await this.manager.save(BoardEntity, boardData);

    const updatedBoard = await this.manager.findOne(BoardEntity, {
      where: { id },
      relations: ['columns'],
    });

    return updatedBoard;
  };

  /**
   * Delete board route controller
   * @param id - Board identifier
   * @returns Promise void
   */
  deleteBoard = async (id: string): Promise<void> => {
    const entity = await this.manager.findOne(BoardEntity, { id });
    await this.manager.remove(entity);
  };
}

export default BoardRepository;

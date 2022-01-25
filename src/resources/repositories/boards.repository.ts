import { DeepPartial, EntityRepository, Repository } from 'typeorm';
import { BoardEntity } from '../entities';

@EntityRepository(BoardEntity)
export class BoardsRepository extends Repository<BoardEntity> {
  /**
   * Get all boards route controller
   * @returns Promise list of boards
   */
  async getBoards(): Promise<BoardEntity[]> {
    const result = await this.manager.find(BoardEntity, {
      relations: ['columns'],
    });
    return result;
  }

  /**
   * Get board by id
   * @param id - Board identifier
   * @returns Promise Board
   */
  async getBoardById(id: string): Promise<BoardEntity | undefined> {
    const board = await this.manager.findOne(BoardEntity, {
      where: { id },
      relations: ['columns'],
    });
    return board;
  }

  /**
   * Create new board route controller
   * @param boardData - Board data
   * @returns Promise Board
   */
  async createBoard(boardData: DeepPartial<BoardEntity>): Promise<BoardEntity> {
    const newBoard = this.manager.create(BoardEntity, boardData);
    await this.manager.save(newBoard);
    return newBoard;
  }

  /**
   * Update board route controller
   * @param id - Board identifier
   * @param boardData - Board data
   * @returns Promise Board
   */
  async updateBoardById(
    id: string,
    boardData: BoardEntity
  ): Promise<BoardEntity | undefined> {
    await this.manager.save(BoardEntity, boardData);

    const updatedBoard = await this.manager.findOne(BoardEntity, {
      where: { id },
      relations: ['columns'],
    });

    return updatedBoard;
  }

  /**
   * Delete board route controller
   * @param id - Board identifier
   * @returns Promise void
   */
  async deleteBoard(id: string): Promise<void> {
    const entity = await this.manager.findOne(BoardEntity, { id });
    await this.manager.remove(entity);
  }
}

import { BoardModel } from '../../types';
import { BoardEntity } from './board.entity';
import { EntityManager, EntityRepository } from "typeorm";
import { TaskEntity } from '../tasks/task.entity';

@EntityRepository(BoardEntity)
class BoardRepository {

  constructor(private manager: EntityManager) { }

  /**
   * Get all boards route controller
   * @returns Promise list of boards
   */
  getBoards = async (): Promise<BoardModel[]> => {
    const result = await this.manager.find(BoardEntity, {relations: ['columns']});
    return result;
  }

  /**
   * Get board by id
   * @param id - Board identifier
   * @returns Promise Board
   */
  getBoardById = async (id: string): Promise<BoardModel | undefined> => {
    const board = await this.manager.findOne(BoardEntity, { 
      where: { id },
      relations: ['columns'] 
    });
    return board;
  }

  /**
   * Create new board route controller
   * @param boardData - Board data
   * @returns Promise Board
   */
  createBoard = async (boardData: BoardModel): Promise<BoardModel> => {
    const newBoard = this.manager.create(BoardEntity, boardData);
    await this.manager.save(BoardEntity, newBoard);
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
    boardData: BoardModel
  ): Promise<BoardModel | undefined> => {
    await this.manager.save(BoardEntity, boardData);

    const updatedBoard = await this.manager.findOne(BoardEntity, {
      where: { id },
      relations: ['columns']
    });

    return updatedBoard;
  };

  /**
   * Delete board route controller
   * @param id - Board identifier
   * @returns Promise void
   */
  deleteBoard = async (id: string): Promise<void> => {
    await this.manager.delete(BoardEntity, {id}); 

    await this.manager.createQueryBuilder().delete().from(TaskEntity).where({boardId: id}).execute();
  };

}

export default BoardRepository;


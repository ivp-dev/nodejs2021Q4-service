import { BoardModel } from '../../types';
import { BoardEntity } from './board.entity';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(BoardEntity)
class BoardRepository extends Repository<BoardModel> {

  /**
   * Get all boards route controller
   * @returns Promise list of boards
   */
  getBoards = async (): Promise<BoardModel[]> => {
    const result = await this.find();
    return result;
  }

  /**
   * Get board by id
   * @param id - Board identifier
   * @returns Promise Board
   */
  getBoardById = async (id: string): Promise<BoardModel | undefined> => {
    const board = await this.findOne({ where: { id: id } });
    return board;
  }

  /**
   * Create new board route controller
   * @param boardData - Board data
   * @returns Promise Board
   */
  createBoard = async (boardData: BoardModel): Promise<BoardModel> => {
    console.log('---------------------')
    console.log(this.create)
    const newBoard = this.create(boardData);
    console.log('####################')
    await this.save(newBoard);
    return newBoard;
  };

  /**
   * Store board route controller
   * @param board - Board
   * @returns Promise void
   */
  addBoard = async (board: BoardModel): Promise<BoardModel> => {
    await this.insert(board);
    return board;
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
    await this.update(id, boardData);
    const updatedBoard = this.findOne({ id });
    return updatedBoard;
  };

  /**
   * Delete board route controller
   * @param id - Board identifier
   * @returns Promise void
   */
  deleteBoard = async (id: string): Promise<void> => {
    await this.delete({ id });
  };

}

export default BoardRepository;


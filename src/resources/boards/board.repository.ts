import state from '../../state';
import { BoardModel } from '../../types';
import BoardEntity from './board.entity';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(BoardEntity)
class BoardRepository extends Repository<BoardModel> {

  /**
   * Get all boards route controller
   * @returns Promise list of boards
   */
  getBoards = async (): Promise<BoardModel[]> => {
    return await this.find();
  }

  /**
   * Get boared by id route controller
   * @param id - Board identifier
   * @returns Promise Board
   */
  getBoardById = async (id: string): Promise<BoardModel | undefined> => {
    const board = (await this.findByIds([id]))?.[0];
    return board;
  }


  /**
   * Create new board route controller
   * @param boardData - Board data
   * @returns Promise Board
   */
  createBoard = async (boardData: BoardModel): Promise<BoardModel> => {
    const newBoard = this.create(boardData);
    await this.save(newBoard);
    return newBoard;
  };

  /**
   * Store board route controller
   * @param board - Board
   * @returns Promise void
   */
  addBoard = async (board: BoardModel): Promise<void> => {
    
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
  deleteBoard = async (id: string): Promise<void> => {
    const boardIndex = state.boards.findIndex((b) => b.id === id);

    if (boardIndex !== -1) {
      state.boards.splice(boardIndex, 1);
    }
  };


}

export default BoardRepository;


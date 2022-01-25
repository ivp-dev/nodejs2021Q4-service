import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, DeepPartial } from 'typeorm';
import { uow } from '../../common/unit-of-work';
import { BoardEntity } from '../entities';
import { BoardsRepository } from '../repositories';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardsRepository)
    private boardsRepository: BoardsRepository,
    private connection: Connection
  ) {}

  /**
   * Get all boards
   * @returns Promise List of boards
   */
  async getAll(): Promise<BoardEntity[]> {
    const result = await this.boardsRepository.getBoards();
    return result;
  }

  /**
   * Get board
   * @param id - Board identifier
   * @returns Promise Board or undefined
   */
  async getById(id: string): Promise<BoardEntity | undefined> {
    const result = await this.boardsRepository.getBoardById(id);
    return result;
  }

  /**
   * Store board
   * @param boardData - Board data
   * @returns Promise Board
   */
  async addBoard(boardData: DeepPartial<BoardEntity>): Promise<BoardEntity> {
    const result = await uow(this.connection, async () => {
      const board = await this.boardsRepository.createBoard(boardData);
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
  async updateBoard(
    id: string,
    boardData: BoardEntity
  ): Promise<BoardEntity | undefined> {
    const result = await uow(this.connection, async () => {
      const board = await this.boardsRepository.updateBoardById(id, boardData);
      return board;
    });

    return result;
  }

  /**
   * Delete board
   * @param id - Board identifier
   * @returns Promise void
   */
  async deleteBoard(id: string): Promise<void> {
    await uow(this.connection, async () => {
      await this.boardsRepository.deleteBoard(id);
    });
  }
}

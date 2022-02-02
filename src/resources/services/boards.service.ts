import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { BoardDto } from '../dto';
import { uow } from '../../common/unit-of-work';
import { BoardEntity } from '../entities';
import { BoardsRepository } from '../repositories';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardsRepository)private boardsRepository: BoardsRepository,
    @InjectMapper() private mapper: Mapper,
    private connection: Connection,
  ) {}

  /**
   * Get all boards
   * @returns Promise List of boards
   */
  async getAll(): Promise<BoardDto[]> {
    const boards = await this.boardsRepository.getBoards();
    const dto = await this.mapper.mapArrayAsync(boards, BoardDto, BoardEntity)
    return dto;
  }

  /**
   * Get board
   * @param id - Board identifier
   * @returns Promise Board or undefined
   */
  async getById(id: string): Promise<BoardDto | undefined> {
    const board = await this.boardsRepository.getBoardById(id);
    const dto = this.mapper.map(board, BoardDto, BoardEntity)
    return dto;
  }

  /**
   * Store board
   * @param boardData - Board data
   * @returns Promise Board
   */
  async addBoard(boardData: BoardDto): Promise<BoardDto> {
    const boardEntity = await uow(this.connection, async () => {
      const mappedBoardEntity = this.mapper.map(boardData, BoardEntity, BoardDto)
      const addedBoardEntity = await this.boardsRepository.createBoard(mappedBoardEntity);
      return addedBoardEntity;
    });
    const boardDto = this.mapper.map(boardEntity, BoardDto, BoardEntity);
    return boardDto;
  }

  /**
   * Update board
   * @param id - Board identifier
   * @param boardData - Board data
   * @returns Promise Board or null
   */
  async updateBoard(
    id: string,
    boardData: BoardDto
  ): Promise<BoardDto | undefined> {
    const boardEntity = await uow(this.connection, async () => {
      const mappedBoardEntity = this.mapper.map(boardData, BoardEntity, BoardDto)
      const updatedBoardEntity = await this.boardsRepository.updateBoardById(id, mappedBoardEntity);
      return updatedBoardEntity;
    });
    const boardDto = this.mapper.map(boardEntity, BoardDto, BoardEntity)
    return boardDto;
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

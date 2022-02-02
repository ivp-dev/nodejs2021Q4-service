import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../guards';
import { BoardEntity } from '../entities';
import { BoardsService } from '../services';

@Controller()
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/boards')
  @UseGuards(JwtAuthGuard)
  async getBoards(): Promise<BoardEntity[]> {
    const tasks = await this.boardsService.getAll();
    return tasks;
  }

  @Get('/boards/:boardId')
  @UseGuards(JwtAuthGuard)
  async getBoard(
    @Param('boardId') boardId: string
  ): Promise<BoardEntity | undefined> {
    const board = await this.boardsService.getById(boardId);
    if (!board) {
      throw new NotFoundException('Board not found');
    }
    return board;
  }

  @Post('/boards')
  @UseGuards(JwtAuthGuard)
  async postBoard(@Body() board: BoardEntity): Promise<BoardEntity> {
    const newBoard = await this.boardsService.addBoard(board);
    return newBoard;
  }

  @Put('/boards/:boardId')
  @UseGuards(JwtAuthGuard)
  async putBoard(
    @Param('boardId') boardId: string,
    @Body() board: BoardEntity
  ): Promise<BoardEntity> {
    const newBoard = await this.boardsService.updateBoard(boardId, board);

    if (!newBoard) {
      throw new BadRequestException('Invalid board data');
    }

    return newBoard;
  }

  @HttpCode(204)
  @Delete('/boards/:boardId')
  @UseGuards(JwtAuthGuard)
  async deleteBoard(@Param('boardId') boardId: string): Promise<void> {
    await this.boardsService.deleteBoard(boardId);
  }
}

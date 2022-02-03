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
import { BoardDto } from '../dto/board.dto';
import { JwtAuthGuard } from '../guards';
import { BoardsService } from '../services';

@Controller()
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/boards')
  @UseGuards(JwtAuthGuard)
  async getBoards(): Promise<BoardDto[]> {
    const boards = await this.boardsService.getAll();
    return boards;
  }

  @Get('/boards/:boardId')
  @UseGuards(JwtAuthGuard)
  async getBoard(
    @Param('boardId') boardId: string
  ): Promise<BoardDto | undefined> {
    const board = await this.boardsService.getById(boardId);
    if (!board) {
      throw new NotFoundException('Board not found');
    }
    return board;
  }

  @Post('/boards')
  @UseGuards(JwtAuthGuard)
  async postBoard(@Body() board: BoardDto): Promise<BoardDto> {
    const newBoard = await this.boardsService.addBoard(board);
    return newBoard;
  }

  @Put('/boards/:boardId')
  @UseGuards(JwtAuthGuard)
  async putBoard(
    @Param('boardId') boardId: string,
    @Body() boardData: BoardDto
  ): Promise<BoardDto> {
    const board = await this.boardsService.updateBoard(boardId, boardData);

    if (!board) {
      throw new BadRequestException('Invalid board data');
    }

    return board;
  }

  @HttpCode(204)
  @Delete('/boards/:boardId')
  @UseGuards(JwtAuthGuard)
  async deleteBoard(@Param('boardId') boardId: string): Promise<void> {
    await this.boardsService.deleteBoard(boardId);
  }
}

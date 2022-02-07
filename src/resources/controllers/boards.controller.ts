import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BoardDto } from '../dto/board.dto';
import { JwtAuthGuard } from '../guards';
import { BoardsService } from '../services';

@ApiBearerAuth()
@ApiTags('boards')
@Controller()
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/boards')
  @ApiOperation({ summary: 'Get boards' })
  @ApiResponse({ status: HttpStatus.OK, type: [BoardDto] })
  @UseGuards(JwtAuthGuard)
  async getBoards(): Promise<BoardDto[]> {
    const boards = await this.boardsService.getAll();
    return boards;
  }

  @Get('/boards/:boardId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get board by id' })
  @ApiResponse({ status: HttpStatus.OK, type: BoardDto })
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
  @ApiOperation({ summary: 'board creation' })
  @ApiResponse({ status: HttpStatus.CREATED, type: BoardDto })
  async postBoard(@Body() board: BoardDto): Promise<BoardDto> {
    const newBoard = await this.boardsService.addBoard(board);
    return newBoard;
  }

  @Put('/boards/:boardId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update board by id' })
  @ApiResponse({ status: HttpStatus.OK, type: BoardDto })
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
  @ApiOperation({ summary: 'Delete board by id' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @UseGuards(JwtAuthGuard)
  async deleteBoard(@Param('boardId') boardId: string): Promise<void> {
    await this.boardsService.deleteBoard(boardId);
  }
}

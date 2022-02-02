import { Board, Column, Task } from '../../types'

export class ColumnDto implements Column {
  id: string;
  boardId: string;
  title: string;
  order: number;
  board: Board;
  tasks: Task[];
}
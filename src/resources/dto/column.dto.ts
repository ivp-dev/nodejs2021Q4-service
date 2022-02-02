import { Board, Task } from '../../types'

export class ColumnDto {
  id?: string;

  boardId?: string;

  title?: string;

  order?: number;

  board?: Board;

  tasks?: Task[];
}
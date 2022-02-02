import { Board, Column, Task } from '../../types';

export class BoardDto implements Board {
  id: string;
  title: string;
  columns: Column[];
  tasks: Task[];
}

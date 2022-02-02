import { Column, Task } from '../../types';

export class BoardDto {
  id?: string;

  title?: string;

  columns?: Column[];

  tasks?: Task[];
}

import { Task } from '../types';

export class TaskDto implements Partial<Task> {
  id?: string;

  boardId?: string;

  userId?: string | null;

  columnId?: string | null;

  title?: string;

  order?: number;

  description?: string;
}


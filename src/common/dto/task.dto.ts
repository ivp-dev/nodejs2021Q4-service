export class TaskDto {
  id?: string;

  boardId?: string;

  userId?: string | null;

  columnId?: string | null;

  title?: string;

  order?: number;

  description?: string;
}

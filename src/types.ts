/**
 * User model
 */
export interface UserModel {
  id: string;
  name: string;
  login: string;
  password: string;
}

/**
 * Column model
 */
export interface ColumnModel {
  id: string;
  title: string;
  order: number;
}

/**
 * Board model
 */
export interface BoardModel {
  id: string;
  title: string;
  columns: ColumnModel[];
}

/**
 * Task model
 */
export interface TaskModel {
  id: string;
  boardId: string;
  userId: string | null;
  columnId: string | null;
  title: string;
  order: number;
  description: string;
}

/**
 * Route state
 */
export interface RootState {
  boards: BoardModel[];
  tasks: TaskModel[];
  users: UserModel[];
}

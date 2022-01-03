import { LoggerPlugin } from "../plugins/logger";

export interface FastifyInstanceLoggerEnable {
  logger: LoggerPlugin;
}

/**
 * User model
 */
export interface UserModel {
  /**
   * User identifier
   */
  id: string;
  /**
   * User name
   */
  name: string;
  /**
   * User login
   */
  login: string;
  /**
   * User password
   */
  password: string;
}

/**
 * Column model
 */
export interface ColumnModel {
  /**
   * Column identifier
   */
  id: string;
  /**
   * Colum title
   */
  title: string;
  /**
   * Column order index
   */
  order: number;
}

/**
 * Board model
 */
export interface BoardModel {
  /**
   * Board identifier
   */
  id: string;
  /**
   * Board title
   */
  title: string;
  /**
   * List of columns of board
   */
  columns: ColumnModel[];
}

/**
 * Task model
 */
export interface TaskModel {
  /**
   * Task identifier
   */
  id: string;
  /**
   * Related board identifier
   */
  boardId: string;
  /**
   * Related user identifier
   */
  userId: string | null;
  /**
   * Related column identifier
   */
  columnId: string | null;
  /**
   * Task title
   */
  title: string;
  /**
   * Task order index 
   */
  order: number;
  /**
   * Type description
   */
  description: string;
}

/**
 * Route state
 */
export interface RootState {
  /**
   * Array of boards 
   */
  boards: BoardModel[];
  /**
   * Array of tasks
   */
  tasks: TaskModel[];
  /**
   * Array of users
   */
  users: UserModel[];
}

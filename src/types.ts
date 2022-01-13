import { LoggerPlugin } from "../plugins/logger";

export interface FastifyInstanceLoggerEnable {
  logger: LoggerPlugin;
}

export interface UnitOfWork {
  start(): void | Promise<void>;
  complete(work: () => void): Promise<void>;
  getRepository<T>(R: new (transactionManager: any) => T): T;
}


export interface UserModel {
  id: string;
  name: string;
  login: string;
  password: string;
  tasks: TaskModel[]
}

/**
 * Column model
 */
export interface ColumnModel {
  id: string;
  boardId: string;
  title: string;
  order: number;
  board: BoardModel
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
  board: BoardModel
  user: UserModel
}

/**
 * Route state
 */
export interface RootState {
  boards: BoardModel[];
  tasks: TaskModel[];
  users: UserModel[];
}

import { EntityManager } from 'typeorm';
import { LoggerPlugin } from '../plugins/logger';

export interface FastifyInstanceLoggerEnable {
  logger: LoggerPlugin;
}

export interface Repository<T> {
  new (transactionManager: EntityManager): T;
}

export interface UnitOfWork {
  start(): Promise<this>;
  complete<T>(
    work: (repository: Repository<T>) => Promise<void>,
    R: new (transactionManager: EntityManager) => Repository<T>
  ): Promise<void>;
  getRepository<T>(
    R: new (transactionManager: EntityManager) => Repository<T>
  ): Repository<T>;
}

export interface LoginModel {
  password: string;
  login: string;
}

export interface UserPayloadModel {
  userId: string,
  login: string
}

export interface TokenDataModel {
  token: string;
}

export interface UserModel {
  id?: string;
  name?: string;
  login?: string;
  password?: string;
  tasks?: TaskModel[];
}

/**
 * Column model
 */
export interface ColumnModel {
  id: string;
  boardId: string;
  title: string;
  order: number;
  board: BoardModel;
  tasks: TaskModel[];
}

/**
 * Board model
 */
export interface BoardModel {
  id: string;
  title: string;
  columns: ColumnModel[];
  tasks: TaskModel[];
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
  board: Partial<BoardModel>;
  user: Partial<UserModel>;
  column: Partial<ColumnModel>;
}

/**
 * Route state
 */
export interface RootState {
  boards: BoardModel[];
  tasks: TaskModel[];
  users: UserModel[];
}

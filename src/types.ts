import { EntityManager } from 'typeorm';

export interface Repository<T> {
  new (transactionManager: EntityManager): T;
}

export interface UnitOfWork<T> {
  start(): Promise<this>;
  do(work: () => Promise<T>): Promise<T>;
}

export interface Login {
  password: string;
  login: string;
}

export interface UserPayloadModel {
  userId: string;
  login: string;
}

export interface TokenDataModel {
  token: string;
}

export interface User {
  id?: string;
  name?: string;
  login?: string;
  password?: string;
  tasks?: Task[];
}

/**
 * Column model
 */
export interface Column {
  id: string;
  boardId: string;
  title: string;
  order: number;
  board: Board;
  tasks: Task[];
}

/**
 * Board model
 */
export interface Board {
  id: string;
  title: string;
  columns: Column[];
  tasks: Task[];
}

/**
 * Task model
 */
export interface Task {
  id: string;
  boardId: string;
  userId: string | null;
  columnId: string | null;
  title: string;
  order: number;
  description: string;
  board: Partial<Board>;
  user: Partial<User>;
  column: Partial<Column>;
}

export type PartialRequired<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;

export interface Identity {
  userId: string
  login: string
}

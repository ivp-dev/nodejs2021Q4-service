import { Connection, QueryRunner } from 'typeorm';
import { UnitOfWork } from '../types';

class WorkAsUnit<E> implements UnitOfWork<E> {
  queryRunner?: QueryRunner;

  constructor(private connection: Connection) {}

  async start(): Promise<this> {
    this.queryRunner = this.connection.createQueryRunner();
    await this.queryRunner.startTransaction();
    return this;
  }

  async do(work: () => Promise<E>): Promise<E> {
    let result: E;

    try {
      result = await work();
      await this.queryRunner?.commitTransaction();
    } catch (error) {
      await this.queryRunner?.rollbackTransaction();
      throw error;
    } finally {
      await this.queryRunner?.release();
    }

    return result;
  }

  static Create<T>(connection: Connection) {
    return new WorkAsUnit<T>(connection);
  }
}

export async function uow<T>(
  connection: Connection,
  work: () => Promise<T>
): Promise<T> {
  const worker = WorkAsUnit.Create<T>(connection);
  await worker.start();
  const result: T = await worker.do(work);
  return result;
}

export default WorkAsUnit;

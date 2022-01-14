import { Connection, EntityManager, getConnection, QueryRunner } from 'typeorm';
import { UnitOfWork } from '../types'

class WorkAsUnit implements UnitOfWork {

  private readonly asyncDatabaseConnection: Connection;
  private readonly queryRunner: QueryRunner;
  private transactionManager?: EntityManager;

  constructor(connectionName?: string) {
    this.asyncDatabaseConnection = getConnection(connectionName)
    this.queryRunner = this.asyncDatabaseConnection.createQueryRunner();
  }

  setTransactionManager() {
    this.transactionManager = this.queryRunner.manager;
  }

  async start(): Promise<this> {
    await this.queryRunner.startTransaction();
    this.setTransactionManager();
    return this;
  }

  getRepository<T>(R: new (transactionManager: EntityManager) => T): T {
    if (!this.transactionManager) {
      throw new Error('Unit of work is not started. Call the start() method');
    }
    return new R(this.transactionManager);
  }

  async complete<T, TR>(work: (repository: T) => Promise<TR>, R: new (transactionManager: EntityManager) => T) {
    let result: TR
    
    try {
      result = await work(this.getRepository(R))
      await this.queryRunner.commitTransaction();
    } catch (error) {
      await this.queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await this.queryRunner.release();
    }

    return result;
  }

  static Create = () => new WorkAsUnit();
}

export async function uow<T, TR>(
  R: new (transactionManager: EntityManager) => T, work: (repository: T) => Promise<TR>): Promise<TR> {
  const uow = WorkAsUnit.Create();
  return await (await uow.start()).complete(work, R);
}


export default WorkAsUnit;
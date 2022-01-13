import { Connection, EntityManager, EntityTarget, getConnection, QueryRunner } from 'typeorm';
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

  async start() {
    await this.queryRunner.startTransaction();
    this.setTransactionManager();
  }

  getRepository<T>(R: new (transactionManager: EntityManager) => T): T {
    if (!this.transactionManager) {
      throw new Error('Unit of work is not started. Call the start() method');
    }
    return new R(this.transactionManager);
  }

  async complete(work: () => void | Promise<void>) {
    try {
      await Promise.resolve(work);
      await this.queryRunner.commitTransaction();
    } catch (error) {
      await this.queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await this.queryRunner.release();
    }
  }

  static Create = () => new WorkAsUnit();
}

export default WorkAsUnit;
import { EntityManager } from "typeorm";

class BaseRepository {
  constructor(manager: EntityManager) { 
    this.manager = manager;
  }

  manager: EntityManager
}

export default BaseRepository;
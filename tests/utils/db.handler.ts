import { MongoMemoryServer } from 'mongodb-memory-server';

export default class MemoryDatabaseServer {
  mongod: MongoMemoryServer;

  constructor() {
    this.mongod = new MongoMemoryServer({
      autoStart: false,
    });
  }

  start() {
    return this.mongod.start();
  }

  stop() {
    return this.mongod.stop();
  }

  async getMongoUri() {
    return await this.mongod.getUri();
  }
}

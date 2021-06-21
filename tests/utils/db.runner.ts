import MemoryDatabaseServer from './db.handler';
import {
  connectDB,
  truncate,
  disconnectDB,
} from '../../src/database/Database.handler';
import mongoose from 'mongoose';
import { fixtures } from './db.fixtures';

export const dbRunner = () => {
  const memoryDB = new MemoryDatabaseServer();

  beforeAll(async () => {
    //Run Mongo in Memmory DB
    await memoryDB.start();
    process.env.MONGO_URL_TEST = await memoryDB.getMongoUri();

    //Connect Db to MongoInMemory
    await connectDB();
  });

  beforeEach(async () => {
    //Init dummy data
    await mongoose.connection.collection('stores').insertMany(fixtures());
  });

  afterEach(async () => {
    //Erase Collections after each test
    await truncate();
  });

  afterAll(async () => {
    //Disconnect DB and turn off MongoInMemmory
    await disconnectDB();
    await memoryDB.stop();
  });
};

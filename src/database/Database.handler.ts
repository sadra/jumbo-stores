import { initialData } from './Database.initializer';
import { ConnectionOptions, connect, connection, disconnect } from 'mongoose';
require('dotenv').config();

const getDBUri = (): string | undefined =>
  process.env.NODE_ENV === 'test'
    ? process.env.MONGO_URL_TEST
    : process.env.MONGO_URL;

export const connectDB = async () => {
  if (!getDBUri()) {
    console.error('❗️[mongo-error]: There is no configs for Mongo DB');
    process.exit(1);
  }

  try {
    const options: ConnectionOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    };

    await connect(getDBUri()!!, options);
    await initialData();

    if (process.env.NODE_ENV !== 'test')
      console.log('📦 [mongo]: MongoDB is connected.');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export const truncate = async () => {
  if (connection.readyState !== 0) {
    const { collections } = connection;

    const promises = Object.keys(collections).map((collection) =>
      connection.collection(collection).deleteMany({}),
    );

    await Promise.all(promises);
  }
};

export const disconnectDB = async () => {
  if (connection.readyState !== 0) {
    await disconnect();
  }
};

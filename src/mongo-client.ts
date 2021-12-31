import { MongoClient } from 'mongodb';

let cachedDb: MongoClient;

export function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  if (process.env.MONGO_URL) {
    const client = new MongoClient(process.env.MONGO_URL);
    cachedDb = client;
    return client.connect();
  } else {
    throw new Error('MongoDB connection url not provided');
  }
}

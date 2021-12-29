import { MongoClient } from 'mongodb';

let cachedDb: MongoClient;


export async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  if (process.env.MONGO_URL) {
    const client = new MongoClient(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    cachedDb = client;
    return await client.connect();
  } else {
    throw new Error('MongoDB connection url not provided');
  }
}

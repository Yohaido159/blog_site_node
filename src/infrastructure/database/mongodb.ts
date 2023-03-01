import { DB_HOST, DB_PORT, DB_DATABASE } from '@/config';
import mongoose from 'mongoose';

export const dbConnection = {
  url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
};

console.log("🚀 ~ file: mongodb.ts:7 ~ dbConnection:", dbConnection)

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);
  const a = await mongoose.connect(dbConnection.url);
  console.log("🚀 ~ file: mongodb.ts:13 ~ connectToDB ~ a:", a)
};
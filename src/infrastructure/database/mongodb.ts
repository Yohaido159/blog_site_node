import { DB_HOST, DB_PORT, DB_DATABASE } from '@/config';
import mongoose from 'mongoose';

export const dbConnection = {
  url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
};


export const connectToDB = async () => {
  mongoose.set('strictQuery', true);
  await mongoose.connect(dbConnection.url);
};
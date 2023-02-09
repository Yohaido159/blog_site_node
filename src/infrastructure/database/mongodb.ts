import { DB_HOST, DB_PORT, DB_DATABASE } from '@/config';
import mongoose from 'mongoose';

export const dbConnection = {
  url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
};

export const connectToDB = () => {
  mongoose.set('strictQuery', true);
  mongoose.connect(dbConnection.url);
};
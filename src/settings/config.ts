import dotenv from 'dotenv';

dotenv.config();

const env = process.env;

export const ADMIN_USERNAME = env.ADMIN_USERNAME || 'admin';
export const ADMIN_PASSWORD = env.ADMIN_PASSWORD || 'qwerty';

export const SETTINGS = {
  PORT: env.PORT || 5001,
  MONGO_URL:
    env.MONGO_URL ||
    env.MONGODB_URI ||
    'mongodb://localhost:27017/ed-back-lessons-uber',
  DB_NAME: env.DB_NAME || 'ed-back-lessons-uber',
};

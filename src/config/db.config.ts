import { registerAs } from '@nestjs/config';

export default registerAs('dataBase', () => ({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  name: process.env.DB,
  port: process.env.DB_PORT,
}));

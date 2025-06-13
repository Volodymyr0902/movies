import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const { DB_NAME, DB_FILE_PATH } = process.env;

const Database = new Sequelize({
  database: DB_NAME,
  dialect: 'sqlite',
  storage: DB_FILE_PATH,
  logging: false,
});

export default Database;

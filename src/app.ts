import express, { Express } from 'express';
import dotenv from 'dotenv';
import Database from './utils/config/db-config';
import ApiRouter from './routers/api.router';
import { errorHandler } from './utils/errors/error-handler';

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', ApiRouter);
app.use(errorHandler);

const { APP_HOST = 'localhost', APP_PORT = 3000 } = process.env;

Database.sync()
  .then(() => {
    app.listen(Number(APP_PORT), APP_HOST, () => {
      console.log(`Server started on ${APP_HOST} on port ${APP_PORT}...`);
    });
  })
  .catch((err: Error) => {
    console.error(err.message);
  });

import express, { Express } from 'express';
import { driversRouter } from './drivers/routers/drivers.router';
import { testingRouter } from './testing/routers/testing.router';

export const setupApp = (app: Express) => {
  app.use(express.json());

  app.get('/', (req, res) => {
    res.status(200).send('Hello world!');
  });

  app.use('/drivers', driversRouter);
  app.use('/testing', testingRouter);

  return app;
};

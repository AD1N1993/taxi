import express, { Express } from 'express';
import { driversRouter } from './drivers/routers/drivers.router';
import { testingRouter } from './testing/routers/testing.router';
import { setupSwagger } from './core/swagger/setup-swagger';
import { DRIVERS_PATH } from './drivers/constants/drivers.paths';
import { TESTING_PATH } from './testing/constants/testing.paths';

export const setupApp = (app: Express) => {
  app.use(express.json());

  app.get('/', (req, res) => {
    res.status(200).send('Hello world!');
  });

  app.use(DRIVERS_PATH, driversRouter);
  app.use(TESTING_PATH, testingRouter);

  setupSwagger(app);

  return app;
};

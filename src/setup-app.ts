import express, { Express, Request, Response } from 'express';
import { db } from './db/in-memory.db';
import { DriverInputDto } from './drivers/dto/driver.input-dto';
import { Driver } from './drivers/types/driver';
import { HttpStatus } from './core/types/http-statuses';

export const setupApp = (app: Express) => {
  app.use(express.json());

  app.get('/', (req, res) => {
    res.status(200).send('Hello world!');
  });

  app.get('/drivers', (req: Request, res: Response) => {
    res.status(200).send(db.drivers);
  });

  app.get('/drivers/:id', (req: Request<{ id: string }>, res: Response) => {
    const driver = db.drivers.find(
      (driver) => driver.id === parseInt(req.params.id, 10),
    );
    if (!driver) {
      res.status(404).send('Driver not found');
    }
    res.status(200).send(driver);
  });

  app.post(
    '/drivers',
    (req: Request<{}, {}, DriverInputDto>, res: Response) => {
      const newDriver: Driver = {
        id: db.drivers.length ? db.drivers[db.drivers.length - 1].id + 1 : 1,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        vehicleMake: req.body.vehicleMake,
        vehicleModel: req.body.vehicleModel,
        vehicleYear: req.body.vehicleYear,
        vehicleLicensePlate: req.body.vehicleLicensePlate,
        vehicleDescription: req.body.vehicleDescription,
        vehicleFeatures: req.body.vehicleFeatures,
        createdAt: new Date(),
      };
      db.drivers.push(newDriver);
      res.status(HttpStatus.Created).send(newDriver);
    },
  );

  app.get('/testing', (req: Request, res: Response) => {
    res.status(200).send('testing url');
  });

  app.delete('/testing/all-data', (req: Request, res: Response) => {
    db.drivers = [];
    res.sendStatus(HttpStatus.NoContent);
  });

  return app;
};

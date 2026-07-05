import express, { Express, Request, Response } from 'express';
import { db } from './db/in-memory.db';
import { DriverInputDto } from './drivers/dto/driver.input-dto';
import { Driver } from './drivers/types/driver';
import { HttpStatus } from './core/types/http-statuses';
import { validateDriverInputDto } from './drivers/validation/vehicleInputDtoValidation';

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
      res.status(HttpStatus.NotFound).send('Driver not found');
      return;
    }
    res.status(HttpStatus.Ok).send(driver);
  });

  app.post(
    '/drivers',
    (req: Request<{}, {}, DriverInputDto>, res: Response) => {
      const errors = validateDriverInputDto(req.body);
      if (errors.length > 0) {
        res.status(HttpStatus.BadRequest).send({ errorMessages: errors });
        return;
      }

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

  app.put(
    '/drivers/:id',
    (req: Request<{ id: string }, {}, DriverInputDto>, res: Response) => {
      const errors = validateDriverInputDto(req.body);
      if (errors.length > 0) {
        res.status(HttpStatus.BadRequest).send({ errorMessages: errors });
        return;
      }

      const driver = db.drivers.find(
        (driver) => driver.id === parseInt(req.params.id, 10),
      );
      if (!driver) {
        res.status(HttpStatus.NotFound).send('Driver not found');
        return;
      }

      driver.name = req.body.name;
      driver.phoneNumber = req.body.phoneNumber;
      driver.email = req.body.email;
      driver.vehicleMake = req.body.vehicleMake;
      driver.vehicleModel = req.body.vehicleModel;
      driver.vehicleYear = req.body.vehicleYear;
      driver.vehicleLicensePlate = req.body.vehicleLicensePlate;
      driver.vehicleDescription = req.body.vehicleDescription;
      driver.vehicleFeatures = req.body.vehicleFeatures;

      res.sendStatus(HttpStatus.NoContent);
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

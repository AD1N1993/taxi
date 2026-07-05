import { Router, Request, Response } from 'express';
import { db } from '../../db/in-memory.db';
import { HttpStatus } from '../../core/types/http-statuses';
import { validateDriverInputDto } from '../validation/vehicleInputDtoValidation';
import { DriverInputDto } from '../dto/driver.input-dto';
import { Driver } from '../types/driver';
import { createErrorMessages } from '../../core/utils/validation-error';

export const driversRouter = Router({});

driversRouter
  // List of drivers
  .get('', (req: Request, res: Response) => {
    res.status(200).send(db.drivers);
  })
  // One driver by id
  .get('/:id', (req: Request<{ id: string }>, res: Response) => {
    const driver = db.drivers.find(
      (driver) => driver.id === parseInt(req.params.id, 10),
    );
    if (!driver) {
      res
        .status(HttpStatus.NotFound)
        .send(
          createErrorMessages([{ field: 'id', message: 'Driver not found' }]),
        );
      return;
    }
    res.status(HttpStatus.Ok).send(driver);
  })
  // Create new driver using validation
  .post('', (req: Request<{}, {}, DriverInputDto>, res: Response) => {
    const errors = validateDriverInputDto(req.body);
    if (errors.length > 0) {
      res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
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
  })
  // Update driver with check exist
  .put(
    '/:id',
    (req: Request<{ id: string }, {}, DriverInputDto>, res: Response) => {
      const index = db.drivers.findIndex((d) => d.id === +req.params.id);

      if (index === -1) {
        res
          .status(HttpStatus.NotFound)
          .send(
            createErrorMessages([{ field: 'id', message: 'Driver not found' }]),
          );
        return;
      }

      const errors = validateDriverInputDto(req.body);

      if (errors.length > 0) {
        res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
        return;
      }

      db.drivers[index] = { ...db.drivers[index], ...req.body };

      res.sendStatus(HttpStatus.NoContent);
    },
  )
  // Delete driver
  .delete('/:id', (req: Request<{ id: string }>, res: Response) => {
    const index = db.drivers.findIndex((d) => d.id === +req.params.id);

    if (index === -1) {
      res
        .status(HttpStatus.NotFound)
        .send(
          createErrorMessages([{ field: 'id', message: 'Driver not found' }]),
        );
      return;
    }

    db.drivers.splice(index, 1);
    res.sendStatus(HttpStatus.NoContent);
  });

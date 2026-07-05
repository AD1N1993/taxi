import { Request, Response } from 'express';
import { DriverInputDto } from '../../dto/driver.input.dto';
import { HttpStatus } from '../../../core/types/http-statuses';

import { Driver } from '../../types/driver';
import { createErrorMessages } from '../../../core/utils/error.utils';
import { validateDriverInputDto } from '../../validation/driver-input-dto.validation';
import { driversRepository } from '../../repositories/drivers.repository';

export function createDriverHandler(
  req: Request<{}, {}, DriverInputDto>,
  res: Response,
) {
  const errors = validateDriverInputDto(req.body);

  if (errors.length > 0) {
    res.status(HttpStatus.BadRequest).send(createErrorMessages(errors));
    return;
  }

  const newDriver: Omit<Driver, 'id'> = {
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

  const createdDriver = driversRepository.create(newDriver);
  res.status(HttpStatus.Created).send(createdDriver);
}

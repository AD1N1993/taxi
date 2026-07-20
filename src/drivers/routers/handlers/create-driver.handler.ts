import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';

import { Driver } from '../../types/driver';
import { driversRepository } from '../../repositories/drivers.repository';
import { DriverCreateInput } from '../../dto/driver.input';
import { mapToDriverOutput } from '../mappers/map-driver-to-output';

export async function createDriverHandler(
  req: Request<{}, {}, DriverCreateInput>,
  res: Response,
) {
  const attributes = req.body.data.attributes;
  const newDriver: Driver = {
    ...attributes,
    createdAt: new Date(),
  };

  const createdDriver = await driversRepository.create(newDriver);
  res.status(HttpStatus.Created).send(mapToDriverOutput(createdDriver));
}

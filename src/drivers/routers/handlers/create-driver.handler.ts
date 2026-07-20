import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';

import { driversService } from '../../application/drivers.service';
import { DriverCreateInput } from '../../dto/driver.input';
import { mapToDriverOutput } from '../mappers/map-driver-to-output';

export async function createDriverHandler(
  req: Request<{}, {}, DriverCreateInput>,
  res: Response,
) {
  const createdDriver = await driversService.create(req.body.data.attributes);
  res.status(HttpStatus.Created).send(mapToDriverOutput(createdDriver));
}

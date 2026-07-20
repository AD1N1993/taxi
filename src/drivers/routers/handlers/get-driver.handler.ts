import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/utils/error.utils';
import { driversService } from '../../application/drivers.service';
import { mapToDriverOutput } from '../mappers/map-driver-to-output';

export async function getDriverHandler(
  req: Request<{ id: string }>,
  res: Response,
) {
  const driver = await driversService.findById(req.params.id);

  if (!driver) {
    res
      .status(HttpStatus.NotFound)
      .send(
        createErrorMessages([{ field: 'id', message: 'Driver not found' }]),
      );
    return;
  }

  res.status(HttpStatus.Ok).send(mapToDriverOutput(driver));
}

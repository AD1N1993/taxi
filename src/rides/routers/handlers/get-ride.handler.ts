import { Request, Response } from 'express';
import { ridesService } from '../../application/rides.service';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/utils/error.utils';
import { mapToRideOutput } from '../mappers/map-ride-to-output';

export async function getRideHandler(
  req: Request<{ id: string }>,
  res: Response,
) {
  const ride = await ridesService.findById(req.params.id);

  if (!ride) {
    res
      .status(HttpStatus.NotFound)
      .send(createErrorMessages([{ field: 'id', message: 'Ride not found' }]));
    return;
  }

  res.status(HttpStatus.Ok).send(mapToRideOutput(ride));
}

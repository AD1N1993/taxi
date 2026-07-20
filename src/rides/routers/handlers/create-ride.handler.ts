import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { ridesService } from '../../application/rides.service';
import { createErrorMessages } from '../../../core/utils/error.utils';
import { RideCreateInput } from '../../dto/ride.input';
import { mapToRideOutput } from '../mappers/map-ride-to-output';

export async function createRideHandler(
  req: Request<{}, {}, RideCreateInput>,
  res: Response,
) {
  // Данные приходят в JSON:API-конверте: всё лежит в data.attributes.
  const createdRide = await ridesService.create(req.body.data.attributes);

  // Поездку можно создать только для существующего водителя.
  if (!createdRide) {
    res
      .status(HttpStatus.BadRequest)
      .send(
        createErrorMessages([
          { field: 'driverId', message: 'Driver not found' },
        ]),
      );
    return;
  }

  res.status(HttpStatus.Created).send(mapToRideOutput(createdRide));
}

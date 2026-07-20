import { Request, Response } from 'express';
import { ridesService } from '../../application/rides.service';
import { HttpStatus } from '../../../core/types/http-statuses';
import { mapToRideListOutput } from '../mappers/map-list-rides-to-output';

export async function getRideListHandler(req: Request, res: Response) {
  const rides = await ridesService.findAll();
  res.status(HttpStatus.Ok).send(mapToRideListOutput(rides));
}

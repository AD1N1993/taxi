import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { driversService } from '../../application/drivers.service';
import { mapToDriverListOutput } from '../mappers/map-list-drivers-to-output';

export async function getDriverListHandler(req: Request, res: Response) {
  const drivers = await driversService.findAll();
  res.status(HttpStatus.Ok).send(mapToDriverListOutput(drivers));
}

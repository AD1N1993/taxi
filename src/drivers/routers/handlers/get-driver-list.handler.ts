import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { driversRepository } from '../../repositories/drivers.repository';
import { mapToDriverListOutput } from '../mappers/map-list-drivers-to-output';

export async function getDriverListHandler(req: Request, res: Response) {
  const drivers = await driversRepository.findAll();
  res.status(HttpStatus.Ok).send(mapToDriverListOutput(drivers));
}

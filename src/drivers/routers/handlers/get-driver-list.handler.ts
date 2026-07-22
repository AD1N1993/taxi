import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { HttpStatus } from '../../../core/types/http-statuses';
import { driversService } from '../../application/drivers.service';
import { mapToDriverListOutput } from '../mappers/map-list-drivers-to-output';
import { DriverQueryInput } from '../../dto/driver-query.input';

export async function getDriverListHandler(req: Request, res: Response) {
  // В Express 5 req.query — read-only геттер, express-validator не может
  // мутировать его (default/toInt). Провалидированные и приведённые значения
  // достаём через matchedData(req).
  const queryInput = matchedData(req) as DriverQueryInput;

  const { items, totalCount } = await driversService.findMany(queryInput);

  const driversListOutput = mapToDriverListOutput(items, {
    pageNumber: queryInput.pageNumber,
    pageSize: queryInput.pageSize,
    totalCount,
  });

  res.status(HttpStatus.Ok).send(driversListOutput);
}

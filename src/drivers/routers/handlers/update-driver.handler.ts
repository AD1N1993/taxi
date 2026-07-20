import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/utils/error.utils';
import { driversRepository } from '../../repositories/drivers.repository';
import { DriverUpdateInput } from '../../dto/driver.input';

export async function updateDriverHandler(
  req: Request<{ id: string }, {}, DriverUpdateInput>,
  res: Response,
) {
  const isUpdated = await driversRepository.update(
    req.params.id,
    req.body.data.attributes,
  );

  if (!isUpdated) {
    res
      .status(HttpStatus.NotFound)
      .send(
        createErrorMessages([{ field: 'id', message: 'Driver not found' }]),
      );
    return;
  }

  res.sendStatus(HttpStatus.NoContent);
}

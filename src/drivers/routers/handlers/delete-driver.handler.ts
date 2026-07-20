import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/utils/error.utils';
import { driversService } from '../../application/drivers.service';

export async function deleteDriverHandler(
  req: Request<{ id: string }>,
  res: Response,
) {
  const isDeleted = await driversService.delete(req.params.id);

  if (!isDeleted) {
    res
      .status(HttpStatus.NotFound)
      .send(
        createErrorMessages([{ field: 'id', message: 'Driver not found' }]),
      );
    return;
  }

  res.sendStatus(HttpStatus.NoContent);
}

import { Router } from 'express';
import { inputValidationResultMiddleware } from '../../core/middlewares/validation/input-validation-result.middleware';
import { superAdminGuardMiddleware } from '../../auth/middlewares/super-admin.guard.middleware';
import { idValidation } from '../../core/middlewares/validation/params-id.validation.middleware';
import { RIDES_ROUTES } from '../constants/rides.paths';
import { rideInputDtoValidation } from '../validation/ride-input-dto.validation';
import { createRideHandler } from './handlers/create-ride.handler';
import { getRideListHandler } from './handlers/get-ride-list.handler';
import { getRideHandler } from './handlers/get-ride.handler';

export const ridesRouter = Router({});

ridesRouter.use(superAdminGuardMiddleware);

ridesRouter
  .get(RIDES_ROUTES.ROOT, getRideListHandler)

  .get(
    RIDES_ROUTES.BY_ID,
    idValidation,
    inputValidationResultMiddleware,
    getRideHandler,
  )

  .post(
    RIDES_ROUTES.ROOT,
    rideInputDtoValidation,
    inputValidationResultMiddleware,
    createRideHandler,
  );

import { Router } from 'express';
import { getDriverListHandler } from './handlers/get-driver-list.handler';
import { getDriverHandler } from './handlers/get-driver.handler';
import { createDriverHandler } from './handlers/create-driver.handler';
import { updateDriverHandler } from './handlers/update-driver.handler';
import { deleteDriverHandler } from './handlers/delete-driver.handler';
import { DRIVERS_ROUTES } from '../constants/drivers.paths';
import { idValidation } from '../../core/middlewares/validation/params-id.validation.middleware';
import { inputValidationResultMiddleware } from '../../core/middlewares/validation/input-validation-result.middleware';
import { paginationAndSortingValidation } from '../../core/middlewares/validation/query-pagination-sorting.validation.middleware';
import { superAdminGuardMiddleware } from '../../auth/middlewares/super-admin.guard.middleware';
import {
  driverCreateInputValidation,
  driverUpdateInputValidation,
} from '../validation/driver-input-dto.validation';
import { DriverSortField } from '../types/driver-sort-field';

export const driversRouter = Router({});

driversRouter.use(superAdminGuardMiddleware);

driversRouter
  .get(
    DRIVERS_ROUTES.ROOT,
    paginationAndSortingValidation(DriverSortField),
    inputValidationResultMiddleware,
    getDriverListHandler,
  )

  .get(
    DRIVERS_ROUTES.BY_ID,
    idValidation,
    inputValidationResultMiddleware,
    getDriverHandler,
  )

  .post(
    DRIVERS_ROUTES.ROOT,
    driverCreateInputValidation,
    inputValidationResultMiddleware,
    createDriverHandler,
  )

  .put(
    DRIVERS_ROUTES.BY_ID,
    idValidation,
    driverUpdateInputValidation,
    inputValidationResultMiddleware,
    updateDriverHandler,
  )

  .delete(
    DRIVERS_ROUTES.BY_ID,
    idValidation,
    inputValidationResultMiddleware,
    deleteDriverHandler,
  );

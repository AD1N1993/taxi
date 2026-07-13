import request from 'supertest';
import { Express } from 'express';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { DRIVERS_PATH } from '../../../src/drivers/constants/drivers.paths';
import { DriverAttributes } from '../../../src/drivers/dto/driver-attributes';
import { DriverUpdateInput } from '../../../src/drivers/dto/driver.input';
import { generateBasicAuthToken } from '../generate-admin-auth-token';
import { getDriverDto } from './get-driver-dto';
import { ResourceType } from '../../../src/core/types/resource-type';

export async function updateDriver(
  app: Express,
  driverId: string,
  driverAttributes?: DriverAttributes,
): Promise<void> {
  const testDriverData: DriverUpdateInput = {
    data: {
      type: ResourceType.Drivers,
      id: driverId,
      attributes: { ...getDriverDto(), ...driverAttributes },
    },
  };

  await request(app)
    .put(`${DRIVERS_PATH}/${driverId}`)
    .set('Authorization', generateBasicAuthToken())
    .send(testDriverData)
    .expect(HttpStatus.NoContent);
}

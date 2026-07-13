import request from 'supertest';
import { Express } from 'express';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { DRIVERS_PATH } from '../../../src/drivers/constants/drivers.paths';
import { generateBasicAuthToken } from '../generate-admin-auth-token';
import { getDriverDto } from './get-driver-dto';
import { DriverCreateInput } from '../../../src/drivers/dto/driver.input';
import { ResourceType } from '../../../src/core/types/resource-type';
import { DriverAttributes } from '../../../src/drivers/dto/driver-attributes';
import { DriverOutput } from '../../../src/drivers/dto/driver.output';
export async function createDriver(
  app: Express,
  driverAttributes?: Partial<DriverAttributes>,
): Promise<DriverOutput> {
  const testDriverData: DriverCreateInput = {
    data: {
      type: ResourceType.Drivers,
      attributes: { ...getDriverDto(), ...driverAttributes },
    },
  };

  const createdDriverResponse = await request(app)
    .post(DRIVERS_PATH)
    .set('Authorization', generateBasicAuthToken())
    .send(testDriverData)
    .expect(HttpStatus.Created);

  return createdDriverResponse.body;
}

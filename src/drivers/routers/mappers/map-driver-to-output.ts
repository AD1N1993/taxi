import { WithId } from 'mongodb';
import { Driver } from '../../types/driver';
import { DriverAttributes } from '../../dto/driver-attributes';
import { DriverOutput } from '../../dto/driver.output';
import { JsonApiResource } from '../../../core/types/json-api';
import { ResourceType } from '../../../core/types/resource-type';

// Превращает водителя из БД в JSON:API-ресурс: ObjectId -> строку,
// поля переносим в attributes. Используется и для одного водителя, и для списка.
export const mapDriverToResource = (
  driver: WithId<Driver>,
): JsonApiResource<ResourceType.Drivers, DriverAttributes> => {
  return {
    type: ResourceType.Drivers,
    id: driver._id.toString(),
    attributes: {
      name: driver.name,
      phoneNumber: driver.phoneNumber,
      email: driver.email,
      vehicleMake: driver.vehicleMake,
      vehicleModel: driver.vehicleModel,
      vehicleYear: driver.vehicleYear,
      vehicleLicensePlate: driver.vehicleLicensePlate,
      vehicleDescription: driver.vehicleDescription,
      vehicleFeatures: driver.vehicleFeatures,
    },
  };
};

// Ответ с одним водителем (JSON:API single resource).
export const mapToDriverOutput = (driver: WithId<Driver>): DriverOutput => {
  return { data: mapDriverToResource(driver) };
};

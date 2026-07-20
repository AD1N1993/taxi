import { WithId } from 'mongodb';
import { Ride } from '../../types/ride';
import { RideOutput, RideResourceAttributes } from '../../dto/ride.output';
import { JsonApiResource } from '../../../core/types/json-api';
import { ResourceType } from '../../../core/types/resource-type';

// Превращает поездку из БД в JSON:API-ресурс: ObjectId -> строку.
// Служебные даты createdAt/updatedAt наружу не отдаём.
export const mapRideToResource = (
  ride: WithId<Ride>,
): JsonApiResource<ResourceType.Rides, RideResourceAttributes> => {
  return {
    type: ResourceType.Rides,
    id: ride._id.toString(),
    attributes: {
      clientName: ride.clientName,
      driverId: ride.driverId,
      driverName: ride.driverName,
      vehicleLicensePlate: ride.vehicleLicensePlate,
      vehicleName: ride.vehicleName,
      price: ride.price,
      currency: ride.currency,
      addresses: ride.addresses,
    },
  };
};

// Ответ с одной поездкой (JSON:API single resource).
export const mapToRideOutput = (ride: WithId<Ride>): RideOutput => {
  return { data: mapRideToResource(ride) };
};

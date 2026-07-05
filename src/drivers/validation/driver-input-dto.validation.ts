import { ValidationError } from '../../core/types/validation-error';
import { DriverInputDto } from '../dto/driver.input.dto';
import { VehicleFeature } from '../types/driver';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const allowedFeatures = Object.values(VehicleFeature) as string[];

export const validateDriverInputDto = (
  data: DriverInputDto,
): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (
    !data.name ||
    typeof data.name !== 'string' ||
    data.name.trim().length < 2 ||
    data.name.trim().length > 15
  ) {
    errors.push({ field: 'name', message: 'Invalid name' });
  }

  if (
    !data.phoneNumber ||
    typeof data.phoneNumber !== 'string' ||
    data.phoneNumber.trim().length < 8 ||
    data.phoneNumber.trim().length > 15
  ) {
    errors.push({ field: 'phoneNumber', message: 'Invalid phoneNumber' });
  }

  if (
    !data.email ||
    typeof data.email !== 'string' ||
    !emailRegex.test(data.email.trim())
  ) {
    errors.push({ field: 'email', message: 'Invalid email' });
  }

  if (
    !data.vehicleMake ||
    typeof data.vehicleMake !== 'string' ||
    data.vehicleMake.trim().length < 1
  ) {
    errors.push({ field: 'vehicleMake', message: 'Invalid vehicleMake' });
  }

  if (
    !data.vehicleModel ||
    typeof data.vehicleModel !== 'string' ||
    data.vehicleModel.trim().length < 1
  ) {
    errors.push({ field: 'vehicleModel', message: 'Invalid vehicleModel' });
  }

  if (
    data.vehicleYear === undefined ||
    data.vehicleYear === null ||
    typeof data.vehicleYear !== 'number' ||
    Number.isNaN(data.vehicleYear)
  ) {
    errors.push({ field: 'vehicleYear', message: 'Invalid vehicleYear' });
  }

  if (
    !data.vehicleLicensePlate ||
    typeof data.vehicleLicensePlate !== 'string' ||
    data.vehicleLicensePlate.trim().length < 1
  ) {
    errors.push({
      field: 'vehicleLicensePlate',
      message: 'Invalid vehicleLicensePlate',
    });
  }

  if (
    data.vehicleDescription !== null &&
    typeof data.vehicleDescription !== 'string'
  ) {
    errors.push({
      field: 'vehicleDescription',
      message: 'Invalid vehicleDescription',
    });
  }

  if (
    !Array.isArray(data.vehicleFeatures) ||
    data.vehicleFeatures.some(
      (feature) => !allowedFeatures.includes(feature as string),
    )
  ) {
    errors.push({
      field: 'vehicleFeatures',
      message: 'Invalid vehicleFeatures',
    });
  }

  return errors;
};

import { WithId } from 'mongodb';
import { Ride } from '../types/ride';
import { RideAttributes } from '../dto/ride-attributes';
import { ridesRepository } from '../repositories/rides.repository';
import { driversService } from '../../drivers/application/drivers.service';

// BLL модуля поездок. Обращение к данным водителей идёт через driversService,
// а не через driversRepository напрямую — так модуль rides не завязан
// на детали хранения чужих данных.
export const ridesService = {
  async findAll(): Promise<WithId<Ride>[]> {
    return ridesRepository.findAll();
  },

  async findById(id: string): Promise<WithId<Ride> | null> {
    return ridesRepository.findById(id);
  },

  // Возвращает null, если водителя с driverId не существует —
  // handler сам решает, каким статусом на это ответить.
  async create(dto: RideAttributes): Promise<WithId<Ride> | null> {
    const driver = await driversService.findById(dto.driverId);

    if (!driver) {
      return null;
    }

    // Данные водителя и его машины копируем в поездку в момент создания.
    const newRide: Ride = {
      clientName: dto.clientName,
      driverId: driver._id.toString(),
      driverName: driver.name,
      vehicleLicensePlate: driver.vehicleLicensePlate,
      vehicleName: `${driver.vehicleMake} ${driver.vehicleModel}`,
      price: dto.price,
      currency: dto.currency,
      createdAt: new Date(),
      updatedAt: null,
      addresses: {
        from: dto.fromAddress,
        to: dto.toAddress,
      },
    };

    return ridesRepository.create(newRide);
  },
};

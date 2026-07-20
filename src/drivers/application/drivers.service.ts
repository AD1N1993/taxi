import { WithId } from 'mongodb';
import { Driver } from '../types/driver';
import { DriverAttributes } from '../dto/driver-attributes';
import { driversRepository } from '../repositories/drivers.repository';

// BLL модуля водителей: бизнес-логика живёт здесь, а не в handler'ах.
// Сервис ничего не знает про HTTP (req/res/statusCode) — только про данные.
export const driversService = {
  async findAll(): Promise<WithId<Driver>[]> {
    return driversRepository.findAll();
  },

  async findById(id: string): Promise<WithId<Driver> | null> {
    return driversRepository.findById(id);
  },

  async create(dto: DriverAttributes): Promise<WithId<Driver>> {
    const newDriver: Driver = {
      ...dto,
      createdAt: new Date(),
    };

    return driversRepository.create(newDriver);
  },

  async update(id: string, dto: DriverAttributes): Promise<boolean> {
    return driversRepository.update(id, dto);
  },

  async delete(id: string): Promise<boolean> {
    return driversRepository.delete(id);
  },
};

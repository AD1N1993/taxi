import { ObjectId, WithId } from 'mongodb';
import { Ride } from '../types/ride';
import { rideCollection } from '../../db/collections';

// Репозиторий отвечает ТОЛЬКО за доступ к данным (CRUD).
export const ridesRepository = {
  async findAll(): Promise<WithId<Ride>[]> {
    return rideCollection.find().toArray();
  },

  async findById(id: string): Promise<WithId<Ride> | null> {
    return rideCollection.findOne({ _id: new ObjectId(id) });
  },

  async create(newRide: Ride): Promise<WithId<Ride>> {
    const insertResult = await rideCollection.insertOne(newRide);
    return { ...newRide, _id: insertResult.insertedId };
  },
};

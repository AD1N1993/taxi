import { WithId } from 'mongodb';
import { Driver } from '../../types/driver';
import { DriverListOutput } from '../../dto/driver.output';
import { mapDriverToResource } from './map-driver-to-output';

// Ответ со списком водителей (JSON:API list + пагинация). Каждый элемент
// маппится тем же mapDriverToResource, что и одиночный ресурс.
export const mapToDriverListOutput = (
  drivers: WithId<Driver>[],
  meta: { pageNumber: number; pageSize: number; totalCount: number },
): DriverListOutput => {
  return {
    meta: {
      page: meta.pageNumber,
      pageSize: meta.pageSize,
      pageCount: Math.ceil(meta.totalCount / meta.pageSize),
      totalCount: meta.totalCount,
    },
    data: drivers.map(mapDriverToResource),
  };
};

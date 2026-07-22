import { SortDirection } from '../../core/types/sort-direction';
import { DriverSortField } from '../types/driver-sort-field';

// Query-параметры для GET-списка водителей после валидации и toInt().
export type DriverQueryInput = {
  pageNumber: number;
  pageSize: number;
  sortBy: DriverSortField;
  sortDirection: SortDirection;
};

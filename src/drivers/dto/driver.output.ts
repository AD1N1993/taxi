import {
  JsonApiListResponse,
  JsonApiSingleResponse,
} from '../../core/types/json-api';
import { ResourceType } from '../../core/types/resource-type';
import { PaginationMeta } from '../../core/types/pagination-meta';
import { DriverAttributes } from './driver-attributes';

// Ответ с одним водителем: { data: { type, id, attributes } }.
export type DriverOutput = JsonApiSingleResponse<
  ResourceType.Drivers,
  DriverAttributes
>;

// Ответ со списком водителей: { meta: PaginationMeta, data: [...] }.
export type DriverListOutput = JsonApiListResponse<
  ResourceType.Drivers,
  DriverAttributes,
  PaginationMeta
>;

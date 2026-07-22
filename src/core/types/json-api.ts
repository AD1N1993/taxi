import { ResourceType } from './resource-type';

// Один ресурс: тип + идентификатор (строка!) + атрибуты.
export type JsonApiResource<T extends ResourceType, A> = {
  type: T;
  id: string;
  attributes: A;
};

// Ответ с одним ресурсом.
export type JsonApiSingleResponse<T extends ResourceType, A> = {
  data: JsonApiResource<T, A>;
};

// Ответ со списком ресурсов. M — тип meta (по умолчанию пустой объект,
// но модуль может передать свой, например с пагинацией).
export type JsonApiListResponse<
  T extends ResourceType,
  A,
  M = Record<string, never>,
> = {
  meta: M;
  data: JsonApiResource<T, A>[];
};

// Тело запроса на создание: ресурс ещё БЕЗ id.
export type JsonApiCreateRequest<T extends ResourceType, A> = {
  data: {
    type: T;
    attributes: A;
  };
};

// Тело запроса на обновление: ресурс С id.
export type JsonApiUpdateRequest<T extends ResourceType, A> = {
  data: {
    type: T;
    id: string;
    attributes: A;
  };
};

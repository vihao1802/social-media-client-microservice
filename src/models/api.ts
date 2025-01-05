export interface Pagination {
  page: number;
  pageSize: number;
  sort?: string;
  includes?: string;
  [key: string]: any;
}

export interface ListResponse<T> {
  items: Array<T>;
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

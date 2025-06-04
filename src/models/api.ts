export interface Pagination {
  page: number;
  size: number;
  sort?: string;
  includes?: string;
  [key: string]: any;
}

export interface ListResponse<T> {
  items: Array<T>;
  page: number;
  size: number;
  total: number;
  pages: number;
}

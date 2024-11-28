export interface Pagination {
    page: number;
    pageSize: number;
}

export interface PaginationResponse extends Pagination {
    totalElements: number;
    totalPages: number;
}

export interface ListResponse<T> {
	data: Array<T>
	pagination: PaginationResponse
}
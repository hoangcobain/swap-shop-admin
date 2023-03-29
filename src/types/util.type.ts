export type SuccessResponse<T, K extends string = 'data'> = {
    [key in K]: T;
} & {
    message: string;
    success: boolean;
    code: number;
};

export type SuccessResponsePagination<T, K extends string = 'data'> = {
    [key in K]: T;
} & {
    message: string;
};

export type Pagination = {
    page: number;
    limit: number;
    page_size: number;
};

export type QueryConfig = {
    page?: number;
    limit?: number;
    sort_by?: string;
    order_by?: 'asc' | 'desc';
    title?: string;
    price_min?: number;
    price_max?: number;
    categories?: string[];
};

export interface IFilterProduct {
    name?: string;
    price?: number;
    createAtBefore?: string;
    createAtAfter?: string;
    updatedAtBefore?: string;
    updatedAtAfter?: string;
    sort?: string;
    page?: string,
    limit?: string
}

export interface IFilterCategory {
	name?: string;
    createAtBefore?: string;
    createAtAfter?: string;
    updatedAtBefore?: string;
    updatedAtAfter?: string;
    sort?: string;
    page?: string,
    limit?: string
}

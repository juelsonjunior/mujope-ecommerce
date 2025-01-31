export interface IFilterProduct {
	id: number;
	name: string;
	price: number;
	categoryId: number;
	createAt: Date;
	updatedAt: Date;
}

export interface IFilterCategory {
	id: number;
	name: string;
}

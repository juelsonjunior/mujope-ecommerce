import { Prisma } from '@prisma/client';

export interface IFilterItems {
	name?: string;
	price?: number;
	createAtBefore?: string;
	createAtAfter?: string;
	updatedAtBefore?: string;
	updatedAtAfter?: string;
	sort?: string;
	page?: string;
	limit?: string;
}

export interface IFilterModelTypes {
	Product: {
		where: Prisma.ProductWhereInput;
		orderBy: Prisma.ProductOrderByWithRelationInput[];
	};
	Category: {
		where: Prisma.CategoryWhereInput;
		orderBy: Prisma.CategoryOrderByWithRelationInput[];
	};
	Customer: {
		where: Prisma.CustomerWhereInput;
		orderBy: Prisma.CustomerOrderByWithRelationInput[];
	};
	Order: {
		where: Prisma.OrderWhereInput;
		orderBy: Prisma.OrderOrderByWithRelationInput[];
	};
	OrderItem: {
		where: Prisma.OrderItemWhereInput;
		orderBy: Prisma.OrderItemOrderByWithRelationInput[];
	};
}

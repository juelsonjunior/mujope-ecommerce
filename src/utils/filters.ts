import { parseISO } from 'date-fns';
import { IFilterItems, IFilterModelTypes } from '../types';
import { Prisma } from '@prisma/client';

export const filterItems = <T extends keyof IFilterModelTypes>(
	filter: IFilterItems,
	queryPag: string | undefined,
	queryLimit: string | undefined,
	model: T
) => {
	const {
		name,
		price,
		createAtBefore,
		createAtAfter,
		updatedAtBefore,
		updatedAtAfter,
		sort,
	} = filter;
	const page = queryPag ? Number(queryPag) : 1;
	const limit = queryLimit ? Number(queryLimit) : 25;
	let order: IFilterModelTypes[T]['orderBy'] = [];
	const where: IFilterModelTypes[T]['where'] =
		{} as IFilterModelTypes[T]['where'];

	if (
		name &&
		(model === 'Product' || model === 'Category' || model === 'Customer')
	) {
		(where as { name?: { contains: string; mode: 'insensitive' } }).name = {
			contains: name,
			mode: 'insensitive',
		};
	}
	if (model === 'Product' && price) {
		(where as Prisma.ProductWhereInput).price = Number(price);
	}

	if (createAtBefore || createAtAfter) {
		where.createAt = {};
		if (createAtBefore) where.createAt.lte = parseISO(createAtBefore);
		if (createAtAfter) where.createAt.gte = parseISO(createAtAfter);
	}
	if (updatedAtBefore || updatedAtAfter) {
		where.updatedAt = {};
		if (updatedAtBefore) where.updatedAt.lte = parseISO(updatedAtBefore);
		if (updatedAtAfter) where.updatedAt.gte = parseISO(updatedAtAfter);
	}
	if (sort) {
		order = sort.split(',').map((item) => {
			const [field, direction] = item.split(':');
			return {
				[field]: direction as 'asc' | 'desc',
			} as IFilterModelTypes[T]['orderBy'][number];
		});
	}

	return { page, limit, where, order };
};

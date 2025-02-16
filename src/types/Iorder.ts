import { Status } from '@prisma/client';

export interface IOrder {
	status: Status;
	total: number;
	customerId: number;
	createAt?: Date;
	updatedAt?: Date;
}

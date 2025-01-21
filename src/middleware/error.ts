import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../helpers/api-error';

export const errorHttpMiddeware = (
	err: Error & Partial<ApiError>,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const message = err.statusCode ? err.message : 'Erro interno do servidor';
	const status = err.statusCode ?? 500;
	console.log(err.message);

	res.status(status).json({ message });
	next();
};

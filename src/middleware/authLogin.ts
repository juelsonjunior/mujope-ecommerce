import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../helpers/api-error';
import { configJWT } from '../utils/configEnv';

const authLogin = (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authorization;

	if (!token) {
		throw new BadRequestError('Token inválido');
	}
	const decoded = jwt.verify(
		token.replace('Bearer ', ''),
		configJWT.secretKey
	);

	if (!decoded) {
		throw new BadRequestError(
			'Você não tem permissão para acessar essa area'
		);
	}

	next();
};

export default authLogin;

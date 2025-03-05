import { PrismaClient, Prisma } from '@prisma/client';
import { ICustomer } from '../types';
import { BadRequestError } from '../helpers/api-error';
import { configJWT } from '../utils/configEnv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class createLoginService {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	async authenticatedLogin(customer: ICustomer): Promise<string> {
		const existCustomer = await this.prisma.customer.findUnique({
			where: { email: customer.email },
		});

		if (!existCustomer) {
			throw new BadRequestError(
				'Email não encontrado! verifique seu email'
			);
		}

		const isMath = await bcrypt.compare(
			customer.password,
			existCustomer.password
		);

		if (!isMath) {
			throw new BadRequestError('Senha incorreta! verifique sua senha');
		}

		const token = jwt.sign({ id: existCustomer.id }, configJWT.secretKey, {
			expiresIn: '1m',
		});

		return token;
	}
}

export default new createLoginService();

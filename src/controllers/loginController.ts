import { Request, Response } from 'express';
import { ICustomer } from '../types';
import { createLoginService } from '../service';

class LoginController {
	async login(req: Request<{}, {}, ICustomer>, res: Response) {
		const token = await createLoginService.authenticatedLogin(req.body);
		res.status(200).json(token);
	}
}

export default new LoginController();

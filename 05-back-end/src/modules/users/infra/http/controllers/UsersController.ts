import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import { classToClass } from 'class-transformer';

class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ name, email, password });

    return response.status(200).json(classToClass(user));
  }
}

export default UsersController;

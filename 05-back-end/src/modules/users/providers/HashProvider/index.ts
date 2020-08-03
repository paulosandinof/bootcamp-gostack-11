import { container } from 'tsyringe';

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';

const providers = {
  bcrypt: BCryptHashProvider,
};

container.registerSingleton<IHashProvider>('HashProvider', providers.bcrypt);

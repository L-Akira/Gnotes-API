import { container } from 'tsyringe';
import BcryptImplementation from './implementations/bcryptImplementation';
import IHashProvider from './model/IHashProvider';

container.registerSingleton<IHashProvider>(
    'HashProvider',
    BcryptImplementation,
)
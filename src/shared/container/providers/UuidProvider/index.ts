import { container } from 'tsyringe';
import UuidImplementation from './implementations/UuidImplementation/index';
import IuuidProvider from './model/IuuidProvider';

container.registerSingleton<IuuidProvider>(
    'UuidProvider',
    UuidImplementation,
)
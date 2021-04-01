import { container } from 'tsyringe';
import JsonWebTokenImplementation from './implementations/JsonWebTokenImplementation';
import IJwtProvider from './model';

container.registerSingleton<IJwtProvider>(
    'JwtProvider',
    JsonWebTokenImplementation,
)
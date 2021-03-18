import IORMProvider from '@shared/container/providers/ORMProvider/model/IORMProvider';
import { container, delay } from 'tsyringe';
import TypeormProvider from './impementations/Typeorm';

container.registerSingleton<IORMProvider>(
  'ORMProvider',
  delay(() => TypeormProvider),
);

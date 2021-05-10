import { ErrorMessages } from '@constants/index';
import { User } from '@models/index';
import IHashProvider from '@shared/container/providers/HashProvider/model/IHashProvider';
import IORMProvider from '@shared/container/providers/ORMProvider/model/IORMProvider';
import IuuidProvider from '@shared/container/providers/UuidProvider/model/IuuidProvider';
import { IUserDTO } from '@shared/dtos';
import ServerError from '@shared/errors/ServerError';
import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class CreateAccountService {
    
    constructor(
        @inject('ORMProvider')
        private ORMProvider: IORMProvider,

        @inject('UuidProvider')
        private uuidProvider: IuuidProvider,

        @inject('HashProvider')
        private hashProvider: IHashProvider
    ){}

    public async execute(request: IUserDTO): Promise<User | ServerError> {
        request.files_quantity = request.folder_quantity = 0;
        
        try {
            request.password  = await this.hashProvider.hash(request.password || '');
        } catch (err) {
            return new ServerError(`${ErrorMessages.CREATE_ACCOUNT_ERROR}\nDetails:${err}`, 500)
        }

        const id = await this.uuidProvider.getUuid();

        const result = await this.ORMProvider.createUser(id, request);       
        
        if (result)
            return classToClass(result);

        return new ServerError(ErrorMessages.CREATE_ACCOUNT_ERROR, 500);
    }
}
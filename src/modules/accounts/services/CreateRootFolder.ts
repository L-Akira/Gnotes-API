import { ErrorMessages } from '@constants/index';
import { RootFolder } from '@models/index';
import IORMProvider from '@shared/container/providers/ORMProvider/model/IORMProvider';
import IuuidProvider from '@shared/container/providers/UuidProvider/model/IuuidProvider';
import { IFolderDTO } from '@shared/dtos';
import ServerError from '@shared/errors/ServerError';
import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class CreateRootFolder {
    constructor(
        @inject('ORMProvider')
        private ORMProvider: IORMProvider,

        @inject('UuidProvider')
        private uuidProvider: IuuidProvider,

    ){}

    public async execute(request: IFolderDTO): Promise<RootFolder | ServerError> {
        try {
            request.files = request.folders = 0;
            request.id = await this.uuidProvider.getUuid();

            const result = await this.ORMProvider.createRootFolder(request);
            
           
            if (result)
                return classToClass(result);

            return new ServerError(ErrorMessages.CREATE_ACCOUNT_ERROR, 500);
        } catch(err) {
            return new ServerError(`${ErrorMessages.DB_ERROR}
            Details: ${err}`, 503);
        }
    }
}
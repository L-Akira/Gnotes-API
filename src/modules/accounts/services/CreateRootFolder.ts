import { ErrorMessages } from '@constants/index';
import IORMProvider from '@shared/container/providers/ORMProvider/model/IORMProvider';
import IuuidProvider from '@shared/container/providers/UuidProvider/model/IuuidProvider';
import { IFolderDTO } from '@shared/dtos';
import ServerError from '@shared/errors/ServerError';
import { inject, injectable } from 'tsyringe';
import { IRootResponse } from '../dtos';

@injectable()
export default class CreateRootFolder {
    constructor(
        @inject('ORMProvider')
        private ORMProvider: IORMProvider,

        @inject('UuidProvider')
        private uuidProvider: IuuidProvider,

    ){}

    public async execute(request: IFolderDTO): Promise<IRootResponse | ServerError> {
        request.files = request.folders = 0;
        request.id = await this.uuidProvider.getUuid();

        const result = await this.ORMProvider.createRootFolder(request);
        
        if (result)
            return { 
                id: result.id,
                files: result.files_quantity || 0,
                folders: result.folders_quantity || 0,
                userId: result.user_id,
            }

        return new ServerError(ErrorMessages.CREATE_ACCOUNT_ERROR, 500);
    }
}
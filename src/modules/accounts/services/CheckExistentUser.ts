import { ErrorMessages } from '@constants/index';
import IORMProvider from '@shared/container/providers/ORMProvider/model/IORMProvider';
import { ISearchUserDTO } from '@shared/dtos';
import ServerError from '@shared/errors/ServerError';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class CheckExistentUser {
    constructor(
        @inject('ORMProvider')
        private ORMProvider: IORMProvider
    ){}

    public async execute(search: ISearchUserDTO): Promise<boolean | ServerError> {
        try{
            const user = await this.ORMProvider.getUser({ 
                email: search.email,
            });
            
            if(!user) {
                const username = await this.ORMProvider.getUser({
                    username: search.username,
                });
                
                return username ? new ServerError(ErrorMessages.EXISTENT_USERNAME, 409) : true;
            }

            return new ServerError(ErrorMessages.EXISTENT_USER, 409);
            
        } catch (err) {
            return new ServerError(`${ErrorMessages.DB_ERROR}
            Details: ${err}`, 503);
        }
    }
}
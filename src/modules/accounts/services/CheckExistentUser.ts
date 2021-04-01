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
            const users = await this.ORMProvider.getRepeatedUser({
                email: search.email,
                username: search.username,
            });

            const length = users.length;

            if(length === 0)
                return true;
            
            if(length === 2)
                return new ServerError(ErrorMessages.EXISTENT_USER, 409);
            
            if(users[0].email === search.email)
                return new ServerError(ErrorMessages.EXISTENT_USER, 409);

            return new ServerError(ErrorMessages.EXISTENT_USERNAME, 409);
            
        } catch (err) {
            return new ServerError(`${ErrorMessages.DB_ERROR}
            Details: ${err}`, 503);
        }
    }
}
import ServerError from '@shared/errors/ServerError';
import IORMProvider from "@shared/container/providers/ORMProvider/model/IORMProvider";
import { ISearchUserDTO } from "@shared/dtos";
import { inject, injectable } from "tsyringe";
import ErrorMesages from '@constants/ErrorMesages';
import { classToClass } from 'class-transformer';
import { User } from '@models/index';

@injectable()
export default class GetOneUserService {
    constructor(
        @inject('ORMProvider')
        private ORMProvider: IORMProvider
    ){}

    public async execute(search: ISearchUserDTO): Promise<User | ServerError> {
        try {
            const user = await this.ORMProvider.getUser(search);

            if(!user)
                return new ServerError(ErrorMesages.UNEXISTENT_USER, 404);
            
            return classToClass(user);
        } catch (err) {
            return new ServerError(`${ErrorMesages.DB_ERROR}
            Details: ${err}`, 503);
        }     
        
    }

}
import { ErrorMessages } from "@constants/index";
import IORMProvider from "@shared/container/providers/ORMProvider/model/IORMProvider";
import { IUserDTO } from "@shared/dtos";
import ServerError from "@shared/errors/ServerError";
import { classToClass } from "class-transformer";
import { inject, injectable } from "tsyringe";

@injectable()
export default class UpdateUser {
    constructor(
        @inject('ORMProvider')
        private ORMProvider: IORMProvider
    ){}

    public async execute(id: string, updates: IUserDTO) {
        try{
            const user = await this.ORMProvider.getUser({ id }, false);

            if(!user)
                return new ServerError(ErrorMessages.UNEXISTENT_USER, 400);

            user.username = updates.username || user.username;
            user.email = updates.email || user.email;

            const updatedUser = await this.ORMProvider.updateUser(user);

            if(updatedUser)
                return classToClass(updatedUser);
            
            return new ServerError(ErrorMessages.UPDATE_ACCOUNT_ERROR, 500);
 
        } catch(err) {
            return new ServerError(`${ErrorMessages.DB_ERROR}
            Details: ${err}`, 503);
        }
       
    }
}
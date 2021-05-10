import { ErrorMessages } from "@constants/index";
import IORMProvider from "@shared/container/providers/ORMProvider/model/IORMProvider";
import ServerError from "@shared/errors/ServerError";
import { inject, injectable } from "tsyringe";

@injectable()
export default class DeleteUser {
    constructor(
        @inject('ORMProvider')
        private ORMProvider: IORMProvider
    ){}

    public async execute(id: string) {
        try{
            const existentUser = await this.ORMProvider.getUser({ id }, false);

            if(!existentUser) 
                return new ServerError(ErrorMessages.UNEXISTENT_USER, 404);
            
            return await this.ORMProvider.deleteUser(id);
        } catch (err) {
            return new ServerError(`${ErrorMessages.DB_ERROR}
            Details: ${err}`, 503);
        }
    }
}

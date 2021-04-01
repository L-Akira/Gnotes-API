import { ErrorMessages } from "@constants/index";
import { User } from "@models/index";
import IHashProvider from "@shared/container/providers/HashProvider/model/IHashProvider";
import IORMProvider from "@shared/container/providers/ORMProvider/model/IORMProvider";
import ServerError from "@shared/errors/ServerError";
import { classToClass } from "class-transformer";
import { inject, injectable } from "tsyringe";

@injectable()
export default class Authentication {
    constructor(
        @inject('ORMProvider')
        private ORMProvider: IORMProvider,

        @inject('HashProvider')
        private HashProvider: IHashProvider,
    ){}

    public async execute(email: string, password: string): Promise<User | ServerError> {
        try{
            const user = await this.ORMProvider.getUser({ email });

            if (!user)
                return new ServerError(ErrorMessages.UNEXISTENT_USER, 400);

            return await this.HashProvider.compare(password, user.password) ? classToClass(user) 
            : new ServerError(ErrorMessages.WRONG_PASSWORD, 400); 
        } catch (err) {
            return new ServerError(`${ErrorMessages.DB_ERROR}
            Details: ${err}`, 503);
        }   
    }
}
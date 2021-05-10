import ErrorMessages from "@constants/ErrorMessages";
import ServerError from "@shared/errors/ServerError";

export default class VerifyPassword {
    constructor() {}

    public async execute(password: string): Promise<boolean | ServerError>{
        password = password.trim();
        const passwordError = new ServerError(ErrorMessages.WEAK_PASSWORD, 400);
        
        const length = password.length;

        if(length < 8) 
            return passwordError;
        
        const hasNumber = /\d/.test(password);

        if(!hasNumber)
            return passwordError;
        
        const hasSpace = /\s/.test(password)

        if(hasSpace)
            return passwordError;

        const hasSpecial = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(password);

        if(!hasSpecial)
            return passwordError;

        return true;
    }
}
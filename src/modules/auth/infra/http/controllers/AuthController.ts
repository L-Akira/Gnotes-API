import { container } from 'tsyringe';
import { Response, Request } from 'express';
import * as yup from 'yup';
import ErrorMesages from '@constants/ErrorMesages';
import { Authentication } from '@modules/auth/services';
import ServerError from '@shared/errors/ServerError';

export default class AuthController {
    public async authenticate(request:Request, response: Response) {
        const schemaLogin = yup.object().shape({
            email:  yup.string().email().required(),
            password: yup.string().required(),
        });

        schemaLogin.isValid({...request.body.login}).then(valid => {
            if(!valid)
            return response.status(400).json({
                message: ErrorMesages.BAD_REQUEST,
            });
        });

        if(request.body.options) {
            const schemaOptions = yup.object().shape({
                rememberMe: yup.boolean(),
            });

            schemaOptions.isValid({...request.body.options}).then(valid => {
                if(!valid)
                return response.status(400).json({
                    message: ErrorMesages.BAD_REQUEST,
                });
            });
        }

        const { email, password } = request.body.login;

        const userAuthentication = container.resolve(Authentication);

        const user = await userAuthentication.execute(email, password);

        if(user instanceof ServerError)
            return response.status(user.code).json({
                message: user.message,
            });
        
        return response.status(200).json({
            data: {
                user,
            }
            
        });
    }
}
import { container } from 'tsyringe';
import { Response, Request } from 'express';
import { CheckExistentUser, CreateAccountService, CreateRootFolder, GetOneUserService } from '@modules/accounts/services';
import ServerError from '@shared/errors/ServerError';
import * as yup from 'yup';
import ErrorMesages from '@constants/ErrorMesages';

export default class AccountController {
  
    public async store(request:Request, response: Response) {
        //schema validation  
        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required(),
            username: yup.string().required(),
            password: yup.string().required(),
        });

        schema.isValid({...request.body.user}).then(valid => {
            if(!valid)
                return response.status(400).json({
                    message: ErrorMesages.BAD_REQUEST,
                });
        });      

        const { name, email, username, password } = request.body.user;
        //double user prevention
        const userExists = container.resolve(CheckExistentUser);
        const alreadyExists = await userExists.execute({ email, username });       

        if (alreadyExists instanceof ServerError) {
            return response.status(alreadyExists.code).json({
                message: alreadyExists.message,
            });
        }
        //user creation
        const createAccount = container.resolve(CreateAccountService);  
        const user = await createAccount.execute({
            email,
            name,
            password,
            username,
        });

        if (user instanceof ServerError) {
            return response.status(user.code).json({ message: user.message });
        }
        //create and attach root folder to user
        const createFolder = container.resolve(CreateRootFolder);
        const rootFolder = await createFolder.execute({
            user_id: user.id,
        });   

        return response.append('Token', 'null').status(201).json({ 
            data: { 
                user,
                rootFolder,
            }
        });
    }

    public async index(request: Request, response: Response) {
        
        const schemaParams = yup.object().shape({
            id: yup.string().uuid().required(),
        });

        schemaParams.validate(request.params).then(valid => {
            if(!valid)
                return response.status(400).json({
                    message: ErrorMesages.BAD_REQUEST,
                });
        });

        if(request.body.ensurement){
            const schemaBody = yup.object().shape({
                email: yup.string().email(),
                username: yup.string(),
            });

            schemaBody.validate(request.body.ensurement).then(valid => {
                if(!valid)
                    return response.status(400).json({
                        message: ErrorMesages.BAD_REQUEST,
                    });
            });   
        }

        const { id } = request.params;

        const getOneUser = container.resolve(GetOneUserService);

        const result = await getOneUser.execute({ 
            id,
            ...request.body.ensurement, 
        });

        if (result instanceof ServerError)
            return response.status(result.code).json({ message: result.message });
        
        return response.status(200).json({
            data: {
                user: result,
            }
        });       
    }
}
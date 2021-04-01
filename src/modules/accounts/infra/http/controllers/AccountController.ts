import { container } from 'tsyringe';
import { Response, Request } from 'express';
import { CheckExistentUser, CreateAccountService, CreateRootFolder, DeleteUser, GetOneUserService } from '@modules/accounts/services';
import ServerError from '@shared/errors/ServerError';
import * as yup from 'yup';
import ErrorMesages from '@constants/ErrorMesages';
export default class AccountController {
  
    public async store(request:Request, response: Response) {
        //schema validation  
        const schemaUser = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required(),
            username: yup.string().required(),
            password: yup.string().required(),
        });

        schemaUser.isValid({...request.body.user}).then(valid => {
            if(!valid)
                return response.status(400).json({
                    message: ErrorMesages.BAD_REQUEST,
                });
        });      

        const { name, email, username, password } = request.body.user;
        //double user prevention
        const checkExistentUser = container.resolve(CheckExistentUser);
        const alreadyExists = await checkExistentUser.execute({ email, username });       

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
        const createRootFolder = container.resolve(CreateRootFolder);
        const rootFolder = await createRootFolder.execute({
            user_id: user.id,
        });   

        if (rootFolder instanceof ServerError) {
            return response.status(rootFolder.code).json({ message: rootFolder.message });
        }

        user.rootFolder = rootFolder;
        
        return response.append('Token', 'null').status(201).json({ 
            data: { 
                user,
            }
        });
    }
    
    public async index(request: Request, response: Response) {
        
        const schemaId = yup.object().shape({
            id: yup.string().uuid().required(),
        });

        schemaId.validate(request.params).then(valid => {
            if(!valid)
                return response.status(400).json({
                    message: ErrorMesages.BAD_REQUEST,
                });
        });

        if(request.body.ensurement){            
            const schemaEnsurement = yup.object().shape({
                email: yup.string().email(),
                username: yup.string(),
            });

            schemaEnsurement.validate({...request.body.ensurement}).then(valid => {
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

    public async delete(request: Request, response: Response) {
        const schemaId = yup.object().shape({
            id: yup.string().uuid().required(),
        });

        schemaId.validate(request.params).then(valid => {
            if(!valid)
                return response.status(400).json({
                    message: ErrorMesages.BAD_REQUEST,
                });
        });

        const { id } = request.params;
        const deleteUser = container.resolve(DeleteUser);

        const hasDeleted = deleteUser.execute(id);

        if(hasDeleted instanceof ServerError) 
            return response.status(hasDeleted.code).json({
                message: hasDeleted.message,
            });
        
        if(!hasDeleted)
            return response.status(500).json({
                message: ErrorMesages.DELETE_USER,
            });

        return response.status(200).json({
            message: `User with id: ${id} successfully deleted`,
        });
    }
}
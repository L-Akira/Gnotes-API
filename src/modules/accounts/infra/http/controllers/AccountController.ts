import { container } from 'tsyringe';
import { Response, Request } from 'express';
import { 
    CheckExistentUser, 
    CreateAccountService, 
    CreateRootFolder, 
    DeleteUser, 
    GetOneUserService, 
    UpdateUser, 
    VerifyPassword
} from '@modules/accounts/services';
import ServerError from '@shared/errors/ServerError';
import * as yup from 'yup';
import { ErrorMessages } from "@constants/index";
export default class AccountController {
  
    public async store(request:Request, response: Response) {
        //schema validation  
        const schemaUser = yup.object().shape({
            email: yup.string().email().required(),
            username: yup.string().required(),
            password: yup.string().required(),
        });

        schemaUser.isValid({...request.body.user}).then(valid => {
            if(!valid)
                return response.status(400).json({
                    message: ErrorMessages.BAD_REQUEST,
                });
        });      

        const { email, username, password } = request.body.user;
        //double user prevention
        const checkExistentUser = container.resolve(CheckExistentUser);
        const alreadyExists = await checkExistentUser.execute({ email, username });       

        if (alreadyExists instanceof ServerError) {
            return response.status(alreadyExists.code).json({
                message: alreadyExists.message,
            });
        }
        //user creation
        const verifyPassword = container.resolve(VerifyPassword);
        const checkedPassword = await verifyPassword.execute(password);

        if(checkedPassword instanceof ServerError)
            return response.status(checkedPassword.code).json({
                message: checkedPassword.message,
            });

        const createAccount = container.resolve(CreateAccountService);
        
        const user = await createAccount.execute({
            email,
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

        schemaId.isValid(request.params).then(valid => {
            if(!valid)
                return response.status(400).json({
                    message: ErrorMessages.BAD_REQUEST,
                });
        });

        if(request.body.ensurement){            
            const schemaEnsurement = yup.object().shape({
                email: yup.string().email(),
                username: yup.string(),
            });

            schemaEnsurement.isValid({...request.body.ensurement}).then(valid => {
                if(!valid)
                    return response.status(400).json({
                        message: ErrorMessages.BAD_REQUEST,
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

        schemaId.isValid(request.params).then(valid => {
            if(!valid)
                return response.status(400).json({
                    message: ErrorMessages.BAD_REQUEST,
                });
        });

        const { id } = request.params;
        const deleteUser = container.resolve(DeleteUser);

        const hasDeleted = await deleteUser.execute(id);

        if(hasDeleted instanceof ServerError) 
            return response.status(hasDeleted.code).json({
                message: hasDeleted.message,
            });
        
        if(!hasDeleted)
            return response.status(500).json({
                message: ErrorMessages.DELETE_USER,
            });

        return response.status(200).json({
            message: `User with id: ${id} successfully deleted`,
        });
    }

    public async update(request: Request, response: Response) {
        const schemaUser = yup.object().shape({
            email: yup.string().email(),
            username: yup.string(),
        });

        schemaUser.isValid({...request.body.user}).then(valid => {
            if(!valid)
                return response.status(400).json({
                    message: ErrorMessages.BAD_REQUEST,
                });
        });  

        const schemaId = yup.object().shape({
            id: yup.string().uuid().required(),
        });

        schemaId.isValid(request.params).then(valid => {
            if(!valid)
                return response.status(400).json({
                    message: ErrorMessages.BAD_REQUEST,
                });
        });

        const { id } = request.params;
        const { user } = request.body;

        if(user.email || user.username){
            const checkExistentUser = container.resolve(CheckExistentUser);
            const existenUser = await checkExistentUser.execute({...user});
            if(existenUser instanceof ServerError)
                return response.status(existenUser.code)
                .json({
                    message: existenUser.message,
                });
        }

        const updateUser = container.resolve(UpdateUser);

        const newUser = await updateUser.execute(id, user);

        if(newUser instanceof ServerError)
            return response.status(newUser.code).json({
                message: newUser.message,
            });

        return response.status(200).json({
            data: {
                newUser,
            }
        });

    }
}
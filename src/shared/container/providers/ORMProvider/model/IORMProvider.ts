import { RootFolder, User } from "@models/index";
import { IFolderDTO, ISearchUserDTO, IUserDTO }from "@shared/dtos";

export default interface IORMProvider {
   getUser(data: ISearchUserDTO): Promise<User | undefined>;

   createUser(id:string, user: IUserDTO): Promise<User | undefined>;

   createRootFolder(data: IFolderDTO): Promise<RootFolder | undefined>

}
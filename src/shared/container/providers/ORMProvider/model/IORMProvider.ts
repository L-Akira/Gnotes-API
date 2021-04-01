import { RootFolder, User } from "@models/index";
import { IFolderDTO, ISearchUserDTO, IUserDTO }from "@shared/dtos";

export default interface IORMProvider {
   //User
   getUser(data: ISearchUserDTO): Promise<User | undefined>;

   createUser(id:string, user: IUserDTO): Promise<User | undefined>;

   getRepeatedUser(data: ISearchUserDTO): Promise<User[]>;

   deleteUser(id: string): Promise<boolean>;

   //Root Folder
   createRootFolder(data: IFolderDTO): Promise<RootFolder | undefined>;
}
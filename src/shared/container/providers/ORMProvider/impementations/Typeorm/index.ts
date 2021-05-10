import { RootFolder, User } from '@models/index';
import IORMProvider from '@shared/container/providers/ORMProvider/model/IORMProvider';
import { IFolderDTO, ISearchUserDTO, IUserDTO } from '@shared/dtos';
import { getCustomRepository } from 'typeorm';
import { UserRepository, RootFolderRepository } from './repositories';

export default class TypeormProvider implements IORMProvider {
    private userRepository = getCustomRepository(UserRepository);
    private rootFolderRepository = getCustomRepository(RootFolderRepository);

    public async createUser(id: string, user: IUserDTO): Promise<User | undefined> {
      const userIntance = this.userRepository.create(
        {
          id,
          email: user.email,
          password: user.password,
          username: user.username,
          files_quantity: user.files_quantity,
          folders_quantity: user.folder_quantity,
        },
      );

      return this.userRepository.save(userIntance);
    }

    public async getUser(data: ISearchUserDTO, attachRoot?: boolean): Promise<User | undefined> {
        if(attachRoot)
          return this.userRepository.findAndRelate({ ...data });

        const finded = await this.userRepository.find({ where: {...data} });
        return finded[0];
    }

    public async getRepeatedUser(data: ISearchUserDTO): Promise<User[]> {
      return this.userRepository.findOcurreces({ ...data });
    }

    public async createRootFolder(data: IFolderDTO): Promise<RootFolder | undefined> {
      const user = await this.getUser({
        id: data.user_id
      });

      const rootFolderInstance = this.rootFolderRepository.create(
        {
          id: data.id,
          user,
          files_quantity: data.files,
          folders_quantity: data.folders,
        }
      );

      return this.rootFolderRepository.save(rootFolderInstance);
    }

    public async deleteUser(id: string): Promise<boolean> {
      try {
        this.userRepository.delete({ id });
        return true;
      } catch (err) {
        return false;
      } 
    }

    public async updateUser(user: User): Promise<User> {
      return this.userRepository.save(user);
    }
}

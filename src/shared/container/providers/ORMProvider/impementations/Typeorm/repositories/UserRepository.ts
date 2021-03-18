import { User } from '@models/index';
import { ISearchUserDTO } from '@shared/dtos';
import { EntityRepository, Repository } from 'typeorm';


@EntityRepository(User)
export default class UserRepository extends Repository<User> {
    public async findAndRelate(preference: ISearchUserDTO): Promise<User> {
        const user = await this.find({
            where: {...preference},
            relations: ['rootFolder']
        });

        return user[0];
    }

}

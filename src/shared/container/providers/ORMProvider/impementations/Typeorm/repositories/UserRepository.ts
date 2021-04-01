import { User } from '@models/index';
import { ISearchUserDTO } from '@shared/dtos';
import { EntityRepository, Repository } from 'typeorm';


@EntityRepository(User)
export default class UserRepository extends Repository<User> {
    public async findAndRelate(preference: ISearchUserDTO): Promise<User | undefined> {
        const user = await this.find({
            where: {...preference},
            relations: ['rootFolder']
        });

        return user[0];
    }

    public async findOcurreces(preference: ISearchUserDTO): Promise<User[]> {
        return this.find({
            where: [
                {email: preference.email},
                {username: preference.username}
            ]
        })
    }

}

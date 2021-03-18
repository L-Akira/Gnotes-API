import bcrypt from 'bcrypt';
import IHashProvider from '../../model/IHashProvider';

export default class BcryptImplementation implements IHashProvider{
    public async hash(password: string): Promise<string> {
        return bcrypt.hash(
            password,
            10
        );
    }

    public async compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash)
    }
}
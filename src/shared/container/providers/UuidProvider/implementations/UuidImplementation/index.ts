import {v4} from 'uuid';
import IuuidProvider from '../../model/IuuidProvider';

export default class UuidImplementation implements IuuidProvider{
    public async getUuid(): Promise<string> {
        return v4();
    }
}
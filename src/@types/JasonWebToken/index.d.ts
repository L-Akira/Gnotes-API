import { User } from '@models/index';
import * as jwt from 'jsonwebtoken';

declare module 'jsonwebtoken' {
    export function verify(token: string, secretOrPublicKey: Secret, options?: VerifyOptions): User | string;
}
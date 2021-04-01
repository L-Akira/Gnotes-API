import { User } from "@models/index";

export default interface IJwtProvider {
    sign(user: User): Promise<string>;
    verify(token: string): Promise<User | string>;
    signRefreshToken(user:User): Promise<string>;
    verifyRefreshToken(token: string): Promise<User | string>;
}
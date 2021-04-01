import { User } from "@models/index";
import IJwtProvider from "../../model";
import * as jwt from "jsonwebtoken";
import { classToClass } from "class-transformer";


export default class JsonWebTokenImplementation implements IJwtProvider {
    public async sign(user: User) {
        return jwt.sign({ user: classToClass(user) }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '35m' });
    }

    public async verify(token: string) {
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    }

    public async signRefreshToken(user: User) {
        return jwt.sign({ user: classToClass(user) }, process.env.REFRESH_TOKEN_SECRET);
    }

    public async verifyRefreshToken(token: string) {
        return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    }
}
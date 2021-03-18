export default class ServerError {
    public readonly message: string;
    public readonly code: number;

    constructor(message: string, errorCode = 400){
        this.message = message;
        this.code = errorCode;
    }
}
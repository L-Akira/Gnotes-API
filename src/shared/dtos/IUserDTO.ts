export default interface IUserDTO {
    name: string;
    username: string;
    password: string;
    email:string;
    files_quantity?: number;
    folder_quantity?: number;
}
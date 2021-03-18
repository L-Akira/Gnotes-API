export default interface IFolderDTO {
    id?: string,
    user_id: string,
    files?: number,
    folders?: number,
    prevFolder?: string,
    title?: string,
    rootFolder?: string,
}
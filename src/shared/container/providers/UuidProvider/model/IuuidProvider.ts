export default interface IuuidProvider {
    getUuid(): Promise<string>;
}
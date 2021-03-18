import { EntityRepository, Repository } from "typeorm";
import { RootFolder } from "@models/index";

@EntityRepository(RootFolder)
export default class RootFolderRepository extends Repository<RootFolder> {

}
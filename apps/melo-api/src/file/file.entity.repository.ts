import { EntityRepository, Repository } from "typeorm";
import { FileEntity } from "./file.entity";
import { FileEntityRepositoryInterface } from "./file.entity.repository.interface";

@EntityRepository(FileEntity)
export class FileEntityRepository extends Repository<FileEntity>
  implements FileEntityRepositoryInterface {}

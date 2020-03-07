import { DeepPartial, SaveOptions } from "typeorm";
import { FileEntity } from "./file.entity";

export interface FileEntityRepositoryInterface {
  save<T extends DeepPartial<FileEntity>>(
    entity: T,
    options?: SaveOptions
  ): Promise<T & FileEntity>;
}

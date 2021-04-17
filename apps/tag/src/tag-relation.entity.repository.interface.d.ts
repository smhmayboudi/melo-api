import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  SaveOptions,
} from "typeorm";

import { TagRelationEntity } from "./tag-relation.entity";

export interface TagRelationEntityRepositoryInterface {
  delete(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectID
      | ObjectID[]
      | FindConditions<TagRelationEntity>
  ): Promise<DeleteResult>;
  find(
    options?: FindManyOptions<TagRelationEntity>
  ): Promise<TagRelationEntity[]>;
  findOne(
    id?: string | number | Date | ObjectID,
    options?: FindOneOptions<TagRelationEntity>
  ): Promise<TagRelationEntity | undefined>;
  save<T extends DeepPartial<TagRelationEntity>>(
    entity: T,
    options?: SaveOptions
  ): Promise<T & TagRelationEntity>;
}

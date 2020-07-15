import {
  DeepPartial,
  DeleteResult,
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  ObjectID,
  SaveOptions,
  UpdateResult,
} from "typeorm";

import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { TagEntity } from "./tag.entity";

export interface TagEntityRepositoryInterface {
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
      | FindConditions<TagEntity>
  ): Promise<DeleteResult>;
  find(options?: FindManyOptions<TagEntity>): Promise<TagEntity[]>;
  findOne(
    id?: string | number | Date | ObjectID,
    options?: FindOneOptions<TagEntity>
  ): Promise<TagEntity | undefined>;
  save<T extends DeepPartial<TagEntity>>(
    entity: T,
    options?: SaveOptions
  ): Promise<T & TagEntity>;
  update(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectID
      | ObjectID[]
      | FindConditions<TagEntity>,
    partialEntity: QueryDeepPartialEntity<TagEntity>
  ): Promise<UpdateResult>;
}

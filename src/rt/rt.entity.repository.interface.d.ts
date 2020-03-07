import {
  DeepPartial,
  DeleteResult,
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  ObjectID,
  SaveOptions,
  UpdateResult
} from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { RtEntity } from "./rt.entity";

export interface RtEntityRepositoryInterface {
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
      | FindConditions<RtEntity>
  ): Promise<DeleteResult>;
  find(options?: FindManyOptions<RtEntity>): Promise<RtEntity[]>;
  findOne(
    id?: string | number | Date | ObjectID,
    options?: FindOneOptions<RtEntity>
  ): Promise<RtEntity | undefined>;
  save<T extends DeepPartial<RtEntity>>(
    entity: T,
    options?: SaveOptions
  ): Promise<T & RtEntity>;
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
      | FindConditions<RtEntity>,
    partialEntity: QueryDeepPartialEntity<RtEntity>
  ): Promise<UpdateResult>;
}

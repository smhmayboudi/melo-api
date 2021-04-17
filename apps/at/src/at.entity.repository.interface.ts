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

import { AtEntity } from "./at.entity";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export interface AtEntityRepositoryInterface {
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
      | FindConditions<AtEntity>
  ): Promise<DeleteResult>;
  find(options?: FindManyOptions<AtEntity>): Promise<AtEntity[]>;
  findOne(
    id?: string | number | Date | ObjectID,
    options?: FindOneOptions<AtEntity>
  ): Promise<AtEntity | undefined>;
  save<T extends DeepPartial<AtEntity>>(
    entity: T,
    options?: SaveOptions
  ): Promise<T & AtEntity>;
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
      | FindConditions<AtEntity>,
    partialEntity: QueryDeepPartialEntity<AtEntity>
  ): Promise<UpdateResult>;
}

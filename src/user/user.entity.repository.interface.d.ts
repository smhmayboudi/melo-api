import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  ObjectID,
  SaveOptions
} from "typeorm";
import { UserEntity } from "./user.entity";

export interface UserEntityRepositoryInterface {
  find(options?: FindManyOptions<UserEntity>): Promise<UserEntity[]>;
  findOne(
    id?: string | number | Date | ObjectID,
    options?: FindOneOptions<UserEntity>
  ): Promise<UserEntity | undefined>;
  save<T extends DeepPartial<UserEntity>>(
    entity: T,
    options?: SaveOptions
  ): Promise<T & UserEntity>;
}

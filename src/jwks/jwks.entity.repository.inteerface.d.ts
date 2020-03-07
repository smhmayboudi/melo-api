import { FindOneOptions, ObjectID } from "typeorm";
import { JwksEntity } from "./jwks.entity";

export interface JwksEntityRepositoryInterface {
  findOne(
    id?: string | number | Date | ObjectID,
    options?: FindOneOptions<JwksEntity>
  ): Promise<JwksEntity | undefined>;
  getOne(): Promise<JwksEntity | undefined>;
}

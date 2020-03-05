import { DeleteResult, UpdateResult } from "typeorm";
import { AtEntity } from "./at.entity";

export interface AtServiceInterface {
  deleteById(id: number): Promise<DeleteResult>;
  deleteByToken(token: string): Promise<DeleteResult>;
  find(): Promise<AtEntity[]>;
  findOneById(id: number): Promise<AtEntity | undefined>;
  findOneByToken(token: string): Promise<AtEntity | undefined>;
  save(entity: AtEntity): Promise<AtEntity>;
  update(entity: AtEntity): Promise<UpdateResult>;
  validateByToken(token: string): Promise<AtEntity | undefined>;
  validateBySub(sub: number): Promise<AtEntity | undefined>;
}

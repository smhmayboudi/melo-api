import { RtEntity } from "./rt.entity";

export interface RtServiceInterface {
  blockById(id: number, description: string): Promise<RtEntity | undefined>;
  blockByToken(
    token: string,
    description: string
  ): Promise<RtEntity | undefined>;
  deleteById(id: number): Promise<RtEntity | undefined>;
  deleteByToken(token: string): Promise<void>;
  find(): Promise<RtEntity[]>;
  findOneById(id: number): Promise<RtEntity | undefined>;
  findOneByToken(token: string): Promise<RtEntity | undefined>;
  save(entities: RtEntity[]): Promise<RtEntity[]>;
  validateBySub(sub: number): Promise<RtEntity | undefined>;
  validateByToken(token: string): Promise<RtEntity | undefined>;
}

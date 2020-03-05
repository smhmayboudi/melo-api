import { JwksEntity } from "./jwks.entity";

export interface JwksServiceInterface {
  findOneById(id: string): Promise<JwksEntity | undefined>;

  getOneRandom(): Promise<JwksEntity | undefined>;
}

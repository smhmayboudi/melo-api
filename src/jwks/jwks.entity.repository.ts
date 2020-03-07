import { EntityRepository, Repository } from "typeorm";
import { JwksEntity } from "./jwks.entity";
import { JwksEntityRepositoryInterface } from "./jwks.entity.repository.interface";

@EntityRepository(JwksEntity)
export class JwksEntityRepository extends Repository<JwksEntity>
  implements JwksEntityRepositoryInterface {
  getOneRandom(): Promise<JwksEntity | undefined> {
    return this.createQueryBuilder()
      .orderBy("RAND()")
      .limit(1)
      .getOne();
  }
}

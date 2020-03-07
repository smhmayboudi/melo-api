import { EntityRepository, Repository } from "typeorm";
import { JwksEntity } from "./jwks.entity";
import { JwksEntityRepositoryInterface } from "./jwks.entity.repository.inteerface";

@EntityRepository(JwksEntity)
export class JwksEntityRepository extends Repository<JwksEntity>
  implements JwksEntityRepositoryInterface {
  getOne(): Promise<JwksEntity | undefined> {
    return this.createQueryBuilder()
      .orderBy("RAND()")
      .limit(1)
      .getOne();
  }
}

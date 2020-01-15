import { EntityRepository, Repository } from "typeorm";
import { JwksEntity } from "./jwks.entity";

@EntityRepository(JwksEntity)
export class JwksEntityRepository extends Repository<JwksEntity> {}

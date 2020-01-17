import { EntityRepository, Repository } from "typeorm";
import { AtEntity } from "./at.entity";

@EntityRepository(AtEntity)
export class AtEntityRepository extends Repository<AtEntity> {}

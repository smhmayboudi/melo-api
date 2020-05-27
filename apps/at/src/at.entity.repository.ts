import { EntityRepository, Repository } from "typeorm";
import { AtEntity } from "./at.entity";
import { AtEntityRepositoryInterface } from "./at.entity.repository.interface";

@EntityRepository(AtEntity)
export class AtEntityRepository extends Repository<AtEntity>
  implements AtEntityRepositoryInterface {}

import { EntityRepository, Repository } from "typeorm";
import { RtEntity } from "./rt.entity";
import { RtEntityRepositoryInterface } from "./rt.entity.repository.interface";

@EntityRepository(RtEntity)
export class RtEntityRepository extends Repository<RtEntity>
  implements RtEntityRepositoryInterface {}

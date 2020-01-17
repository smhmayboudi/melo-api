import { EntityRepository, Repository } from "typeorm";
import { RtEntity } from "./rt.entity";

@EntityRepository(RtEntity)
export class RtEntityRepository extends Repository<RtEntity> {}

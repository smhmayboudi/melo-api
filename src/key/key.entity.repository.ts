import { EntityRepository, Repository } from "typeorm";
import { KeyEntity } from "./key.entity";

@EntityRepository(KeyEntity)
export class KeyEntityRepository extends Repository<KeyEntity> {}

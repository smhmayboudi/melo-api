import { EntityRepository, Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import { UserEntityRepositoryInterface } from "./user.entity.repository.interface";

@EntityRepository(UserEntity)
export class UserEntityRepository extends Repository<UserEntity>
  implements UserEntityRepositoryInterface {}

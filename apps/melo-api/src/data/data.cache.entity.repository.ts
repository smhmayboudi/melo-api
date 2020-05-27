import { EntityRepository, Repository } from "typeorm";

import { DataCacheEntity } from "./data.cache.entity";
import { DataCacheEntityRepositoryInterface } from "./data.cache.entity.repository.interface";

@EntityRepository(DataCacheEntity)
export class DataCacheEntityRepository extends Repository<DataCacheEntity>
  implements DataCacheEntityRepositoryInterface {}

import { EntityRepository, Repository } from "typeorm";

import { SongCacheEntity } from "./song.cache.entity";
import { SongCacheEntityRepositoryInterface } from "./song.cache.entity.repository.interface";

@EntityRepository(SongCacheEntity)
export class SongCacheEntityRepository extends Repository<SongCacheEntity>
  implements SongCacheEntityRepositoryInterface {}

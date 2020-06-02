import { EntityRepository, Repository } from "typeorm";

import { SongSiteEntity } from "./song.site.entity";
import { SongSiteEntityRepositoryInterface } from "./song.site.entity.repository.interface";

@EntityRepository(SongSiteEntity)
export class SongSiteEntityRepository extends Repository<SongSiteEntity>
  implements SongSiteEntityRepositoryInterface {}

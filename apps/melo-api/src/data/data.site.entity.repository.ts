import { EntityRepository, Repository } from "typeorm";

import { DataSiteEntity } from "./data.site.entity";
import { DataSiteEntityRepositoryInterface } from "./data.site.entity.repository.interface";

@EntityRepository(DataSiteEntity)
export class DataSiteEntityRepository extends Repository<DataSiteEntity>
  implements DataSiteEntityRepositoryInterface {}

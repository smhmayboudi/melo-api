import { EntityRepository, Repository } from "typeorm";

import { TagEntity } from "./tag.entity";
import { TagEntityRepositoryInterface } from "./tag.entity.repository.interface";

@EntityRepository(TagEntity)
export class TagEntityRepository extends Repository<TagEntity>
  implements TagEntityRepositoryInterface {}

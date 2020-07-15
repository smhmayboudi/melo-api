import { EntityRepository, Repository } from "typeorm";

import { TagEntity } from "./tag.entity";
import { TagRelationEntity } from "./tag-relation.entity";
import { TagRelationEntityRepositoryInterface } from "./tag-relation.entity.repository.interface";

@EntityRepository(TagEntity)
export class TagRelationEntityRepository extends Repository<TagRelationEntity>
  implements TagRelationEntityRepositoryInterface {}

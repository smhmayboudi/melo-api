import { RelationType } from "./RelationType";
import { Entity } from "./Entity";

export interface EntityRelate {
  from: Entity;
  relation: RelationType;
  to: Entity;
}

import { Entity } from "./Entity";

export interface PaginationResult {
  results: Entity[];
  total: number;
}

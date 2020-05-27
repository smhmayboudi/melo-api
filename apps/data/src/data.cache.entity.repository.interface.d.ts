import { DataCacheEntity } from "./data.cache.entity";

export interface DataCacheEntityRepositoryInterface {
  query(query: string): Promise<DataCacheEntity[]>;
}

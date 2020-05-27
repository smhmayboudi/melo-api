import { DataSiteEntity } from "./data.site.entity";

export interface DataSiteEntityRepositoryInterface {
  query(query: string): Promise<DataSiteEntity[]>;
}

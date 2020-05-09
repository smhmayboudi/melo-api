export interface SearchConfigServiceInterface {
  cacheHost: string;
  cacheMax: number;
  cachePort: number;
  cacheStore: string;
  cacheTTL: number;
  elasticNode: string;
  elasticScriptScore: string;
  index: string;
  suggestIndex: string;
  size: number;
}

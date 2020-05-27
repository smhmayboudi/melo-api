export interface SearchConfigServiceInterface {
  cacheHost: string;
  cacheMax: number;
  cachePort: number;
  cacheStore: string;
  cacheTTL: number;
  elasticNode: string;
  indexName: string;
  maxSize: number;
  scriptScore: string;
  suggestIndex: string;
}

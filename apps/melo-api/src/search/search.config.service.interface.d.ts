export interface SearchConfigServiceInterface {
  cacheHost: string;
  cacheMax: number;
  cachePort: number;
  cacheStore: string;
  cacheTTL: number;
  elasticsearchNode: string;
  indexName: string;
  maxSize: number;
  scriptScore: string;
  suggestIndex: string;
}

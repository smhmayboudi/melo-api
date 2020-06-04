export interface SearchConfigServiceInterface {
  elasticsearchNode: string;
  indexName: string;
  maxSize: number;
  scriptScore: string;
  suggestIndex: string;
}

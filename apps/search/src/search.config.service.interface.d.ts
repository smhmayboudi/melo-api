export interface SearchConfigServiceInterface {
  elasticsearchNode: string;
  indexName: string;
  maxSize: number;
  scriptScore: string;
  servicePort: number;
  serviceRetryAttempts: number;
  serviceRetryDelay: number;
  serviceUrl: string;
  suggestIndex: string;
}

export interface DownloadConfigServiceInterface {
  elasticsearchNode: string;
  indexName: string;
  maxSize: number;
  servicePort: number;
  serviceRetryAttempts: number;
  serviceRetryDelay: number;
  serviceUrl: string;
}

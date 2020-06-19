export interface ArtistConfigServiceInterface {
  elasticsearchNode: string;
  imagePath: string;
  imagePathDefaultArtist: string;
  indexName: string;
  maxSize: number;
  servicePort: number;
  serviceRetryAttempts: number;
  serviceRetryDelay: number;
  serviceUrl: string;
}

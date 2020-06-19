export interface AlbumConfigServiceInterface {
  elasticsearchNode: string;
  imagePath: string;
  imagePathDefaultAlbum: string;
  indexName: string;
  maxSize: number;
  servicePort: number;
  serviceRetryAttempts: number;
  serviceRetryDelay: number;
  serviceUrl: string;
}

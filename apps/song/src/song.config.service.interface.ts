export interface SongConfigServiceInterface {
  elasticsearchNode: string;
  imagePath: string;
  imagePathDefaultSong: string;
  indexName: string;
  maxSize: number;
  mp3Endpoint: string;
  sendTimeout: number;
  sendUrl: string;
  servicePort: number;
  serviceRetryAttempts: number;
  serviceRetryDelay: number;
  serviceUrl: string;
  typeormDatabase: string;
  typeormHost: string;
  typeormLogging: boolean;
  typeormPassword: string;
  typeormPort: number;
  typeormSynchronize: boolean;
  typeormUsername: string;
}

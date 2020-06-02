import { DataImageTypeSize } from "@melo/common";
import { SignatureSize } from "imgproxy/dist/types";

export interface SongConfigServiceInterface {
  elasticsearchNode: string;
  imageBaseUrl: string;
  imageEncode: boolean;
  imageKey: string;
  imagePath: string;
  imagePathDefaultAlbum: string;
  imagePathDefaultArtist: string;
  imagePathDefaultSong: string;
  imageSalt: string;
  imageSignatureSize: SignatureSize;
  imageTypeSize: DataImageTypeSize[];
  indexName: string;
  maxSize: number;
  mp3Endpoint: string;
  typeormDatabase: string;
  typeormHost: string;
  typeormLogging: boolean;
  typeormPassword: string;
  typeormPort: number;
  typeormSynchronize: boolean;
  typeormUsername: string;
}

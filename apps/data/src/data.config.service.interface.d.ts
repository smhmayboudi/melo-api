import { DataImageTypeSize } from "@melo/common";
import { SignatureSize } from "imgproxy/dist/types";

export interface DataConfigServiceInterface {
  elasticNode: string;
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
  typeOrmDatabase: string;
  typeOrmHost: string;
  typeOrmLogging: boolean;
  typeOrmPassword: string;
  typeOrmPort: number;
  typeOrmSynchronize: boolean;
  typeOrmUsername: string;
}

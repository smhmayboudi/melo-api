import { CommonImageTypeSize } from "@melo/common";
import { SignatureSize } from "imgproxy/dist/types";

export interface ConstConfigServiceInterface {
  imageBaseUrl: string;
  imageEncode: boolean;
  imageKey: string;
  imageSalt: string;
  imageSignatureSize: SignatureSize;
  imageTypeSize: CommonImageTypeSize[];
  servicePort: number;
  serviceRetryAttempts: number;
  serviceRetryDelay: number;
  serviceUrl: string;
  staticImagePaths: { [key: string]: string };
}

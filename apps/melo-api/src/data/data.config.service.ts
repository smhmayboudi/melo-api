import { DATA, DataImageTypeSize } from "@melo/common";

import { ConfigService } from "@nestjs/config";
import { DataConfigServiceInterface } from "./data.config.service.interface";
import { Injectable } from "@nestjs/common";
import { SignatureSize } from "imgproxy/dist/types";

@Injectable()
export class DataConfigService implements DataConfigServiceInterface {
  constructor(private readonly configService: ConfigService) {}

  get elasticNode(): string {
    return this.configService.get<string>(`${DATA}.elasticNode`, "");
  }

  get imageBaseUrl(): string {
    return this.configService.get<string>(`${DATA}.imageBaseUrl`, "");
  }

  get imageEncode(): boolean {
    return this.configService.get<boolean>(`${DATA}.imageEncode`, true);
  }

  get imagePath(): string {
    return this.configService.get<string>(`${DATA}.imagePath`, "");
  }

  get imagePathDefaultAlbum(): string {
    return this.configService.get<string>(`${DATA}.imagePathDefaultAlbum`, "");
  }

  get imagePathDefaultArtist(): string {
    return this.configService.get<string>(`${DATA}.imagePathDefaultArtist`, "");
  }

  get imagePathDefaultSong(): string {
    return this.configService.get<string>(`${DATA}.imagePathDefaultSong`, "");
  }

  get imageTypeSize(): DataImageTypeSize[] {
    return JSON.parse(
      this.configService.get<string>(`${DATA}.imageTypeSize`, "")
    ) as DataImageTypeSize[];
  }

  get imageKey(): string {
    return this.configService.get<string>(`${DATA}.imageKey`, "");
  }

  get imageSalt(): string {
    return this.configService.get<string>(`${DATA}.imageSalt`, "");
  }

  get imageSignatureSize(): SignatureSize {
    return this.configService.get<SignatureSize>(
      `${DATA}.imageSignatureSize`,
      1
    );
  }

  get indexName(): string {
    return this.configService.get<string>(`${DATA}.index`, "");
  }

  get mp3Endpoint(): string {
    return this.configService.get<string>(`${DATA}.mp3Endpoint`, "");
  }

  get maxSize(): number {
    return this.configService.get<number>(`${DATA}.maxSize`, 0);
  }

  get typeOrmDatabase(): string {
    return this.configService.get<string>(`${DATA}.typeOrmDatabase`, "");
  }

  get typeOrmHost(): string {
    return this.configService.get<string>(`${DATA}.typeOrmHost`, "");
  }

  get typeOrmLogging(): boolean {
    return this.configService.get<boolean>(`${DATA}.typeOrmLogging`, true);
  }

  get typeOrmPassword(): string {
    return this.configService.get<string>(`${DATA}.typeOrmPassword`, "");
  }

  get typeOrmPort(): number {
    return this.configService.get<number>(`${DATA}.typeOrmPort`, 0);
  }

  get typeOrmSynchronize(): boolean {
    return this.configService.get<boolean>(`${DATA}.typeOrmSynchronize`, false);
  }

  get typeOrmUsername(): string {
    return this.configService.get<string>(`${DATA}.typeOrmUsername`, "");
  }
}

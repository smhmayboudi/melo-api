import { Injectable } from "@nestjs/common";
import Hashids from "hashids/cjs";
import { AppConfigService } from "./app.config.service";
import { appConstant } from "./app.constant";

@Injectable()
export class AppHashIdService {
  private readonly hashIds: Hashids;

  constructor(private readonly appConfigService: AppConfigService) {
    this.hashIds = new Hashids(
      this.appConfigService.hashIdSalt,
      parseInt(this.appConfigService.hashIdMinLength.toString(), 10),
      this.appConfigService.hashIdAlphabet,
      this.appConfigService.hashIdSeps
    );
  }

  decode(hash: string): number {
    return this.hashIds.decode(hash)[0] as number;
  }

  encode(id: number): string {
    const encoded = this.hashIds.encode(id);
    if (encoded === "") {
      throw new Error(appConstant.errors.service.encoded);
    }
    return encoded;
  }
}

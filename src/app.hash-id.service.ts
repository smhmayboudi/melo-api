import { Injectable } from "@nestjs/common";
import Hashids from "hashids/cjs";
import { AppConfigService } from "./app.config.service";
import { appConstant } from "./app.constant";

@Injectable()
export class AppHashIdService {
  private readonly hashIds: Hashids;

  constructor(private readonly appConfigService: AppConfigService) {
    this.hashIds = new Hashids(this.appConfigService.hashIdSalt);
  }

  decode(hash: string): number {
    return this.hashIds.decode(
      Buffer.from(hash, "base64").toString("utf8")
    )[0] as number;
  }

  encode(id: number | string): string {
    const encoded = Buffer.from(this.hashIds.encode(id.toString()), "utf8")
      .toString("base64")
      .split("=")[0];
    if (encoded === "") {
      throw new Error(appConstant.errors.encoded);
    }
    return encoded;
  }
}

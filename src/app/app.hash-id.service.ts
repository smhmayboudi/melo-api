import { BadRequestException, Injectable } from "@nestjs/common";

import { AppConfigService } from "./app.config.service";
import { AppHashIdServiceInterface } from "./app.hash-id.service.interface";
import Hashids from "hashids/cjs";

@Injectable()
export class AppHashIdService implements AppHashIdServiceInterface {
  private readonly hashIds: Hashids;

  constructor(private readonly appConfigService: AppConfigService) {
    this.hashIds = new Hashids(
      this.appConfigService.hashIdSalt,
      this.appConfigService.hashIdMinLength,
      this.appConfigService.hashIdAlphabet,
      this.appConfigService.hashIdSeps
    );
  }

  decode(hash: string): number {
    // return this.hashIds.decode(hash)[0] as number;
    // TODO: performance issue
    return this.hashIds.decode(
      Buffer.from(hash, "base64").toString("utf8")
    )[0] as number;
  }

  encode(id: number): string {
    // const encoded = this.hashIds.encode(id);
    // TODO: performance issue
    const encoded = Buffer.from(this.hashIds.encode(id.toString()), "utf8")
      .toString("base64")
      .split("=")[0];
    if (encoded === "") {
      throw new BadRequestException();
    }
    return encoded;
  }
}

import { AppConfigService } from "../app/app.config.service";
import { CONST } from "@melo/common";
import { ConfigService } from "@nestjs/config";
import { ConstConfigServiceInterface } from "./const.config.service.interface";
import { Injectable } from "@nestjs/common";
import ms from "ms";

@Injectable()
export class ConstConfigService implements ConstConfigServiceInterface {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly configService: ConfigService
  ) {}

  get cacheHost(): string {
    return this.configService.get<string>(
      `${CONST}.cacheHost`,
      this.appConfigService.cacheHost
    );
  }

  get cacheMax(): number {
    return this.configService.get<number>(
      `${CONST}.cacheMax`,
      this.appConfigService.cacheMax
    );
  }

  get cachePort(): number {
    return this.configService.get<number>(
      `${CONST}.cachePort`,
      this.appConfigService.cachePort
    );
  }

  get cacheStore(): string {
    return this.configService.get<string>(
      `${CONST}.cacheStore`,
      this.appConfigService.cacheStore
    );
  }

  get cacheTTL(): number {
    return ms(
      this.configService.get<string>(
        `${CONST}.cacheTTL`,
        ms(this.appConfigService.cacheTTL)
      )
    );
  }

  get staticImagePaths(): { [key: string]: string } {
    return JSON.parse(
      this.configService.get<string>(`${CONST}.staticImagePaths`, '{"":""}')
    );
  }
}

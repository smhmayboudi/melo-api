import { CONST, STATIC_IMAGE_PATHS } from "@melo/common";

import { ConfigService } from "@nestjs/config";
import { ConstConfigServiceInterface } from "./const.config.service.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ConstConfigService implements ConstConfigServiceInterface {
  constructor(private readonly configService: ConfigService) {}

  get staticImagePaths(): { [key: string]: string } {
    return JSON.parse(
      this.configService.get<string>(
        `${CONST}.${STATIC_IMAGE_PATHS}`,
        '{"":""}'
      )
    );
  }
}

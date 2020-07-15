import { ClientsModule, Transport } from "@nestjs/microservices";
import { Module, forwardRef } from "@nestjs/common";

import { AppModule } from "../app/app.module";
import { ConfigModule } from "@nestjs/config";
import { TAG_SERVICE } from "@melo/common";
import { TagConfigService } from "./tag.config.service";
import { TagHealthIndicator } from "./tag.health.indicator";
import { TagService } from "./tag.service";
import config from "./tag.config";

@Module({
  exports: [TagConfigService, TagHealthIndicator, TagService],
  imports: [
    forwardRef(() => AppModule),
    ClientsModule.register([
      {
        name: TAG_SERVICE,
        options: {
          url: process.env.TAG_SERVICE_URL,
        },
        transport: Transport.REDIS,
      },
    ]),
    ConfigModule.forFeature(config),
  ],
  providers: [TagConfigService, TagHealthIndicator, TagService],
})
export class TagModule {}

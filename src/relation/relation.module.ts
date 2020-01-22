import { HttpModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import config from "./relation.config";
import { RelationConfigService } from "./relation.config.service";
import { RelationHealthIndicator } from "./relation.health";
import { RelationHttpModuleOptionsFactory } from "./relation.http.options.factory";
import { RelationService } from "./relation.service";

@Module({
  controllers: [],
  exports: [RelationConfigService, RelationHealthIndicator, RelationService],
  imports: [
    HttpModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [RelationModule],
      useClass: RelationHttpModuleOptionsFactory
    }),
    ConfigModule.forFeature(config)
  ],
  providers: [RelationConfigService, RelationHealthIndicator, RelationService]
})
export class RelationModule {}

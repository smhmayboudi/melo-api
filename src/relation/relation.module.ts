import { HttpModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PromModule } from "../prom/prom.module";
import config from "./relation.config";
import { RelationConfigService } from "./relation.config.service";
import { RelationHealthIndicator } from "./relation.health.indicator";
import { RelationHttpModuleOptionsFactory } from "./relation.http.options.factory";
import { RelationService } from "./relation.service";

@Module({
  exports: [RelationConfigService, RelationHealthIndicator, RelationService],
  imports: [
    ConfigModule.forFeature(config),
    HttpModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [RelationModule],
      useClass: RelationHttpModuleOptionsFactory
    }),
    PromModule.forCounter({
      help: "counter",
      labelNames: ["function", "module", "service"],
      name: "relation"
    })
  ],
  providers: [RelationConfigService, RelationHealthIndicator, RelationService]
})
export class RelationModule {}

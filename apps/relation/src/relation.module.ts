import { ConfigModule } from "@nestjs/config";
import { DgraphModule } from "@melo/dgraph";
import { Module } from "@nestjs/common";
import { RelationConfigService } from "./relation.config.service";
import { RelationController } from "./relation.controller";
import { RelationDgraphOptionsFactory } from "./relation.dgraph.options.factory";
import { RelationService } from "./relation.service";
import config from "./relation.config";

@Module({
  controllers: [RelationController],
  exports: [RelationConfigService, RelationService],
  imports: [
    ConfigModule.forRoot(),
    ConfigModule.forFeature(config),
    DgraphModule.forRootAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [RelationModule],
      useClass: RelationDgraphOptionsFactory,
    }),
  ],
  providers: [RelationConfigService, RelationService],
})
export class RelationModule {}

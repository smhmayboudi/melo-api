import { ConfigModule } from "@nestjs/config";
import { DgraphModule } from "@melo/dgraph";
import { Module } from "@nestjs/common";
import { RelationConfigService } from "./relation.config.service";
import { RelationController } from "./relation.controller";
import { RelationDgraphOptionsFactory } from "./relation.dgraph.options.factory";
import { RelationService } from "./relation.service";

@Module({
  controllers: [RelationController],
  exports: [RelationConfigService, RelationService],
  imports: [
    ConfigModule.forRoot(),
    DgraphModule.forRootAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [RelationModule],
      useClass: RelationDgraphOptionsFactory,
    }),
  ],
  providers: [RelationConfigService, RelationService],
})
export class RelationModule {}

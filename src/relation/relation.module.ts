import { HttpModule, Module } from "@nestjs/common";
import { RelationConfigService } from "./relation.config.service";
import { RelationHttpModuleOptionsFactory } from "./relation.http.options.factory";
import { RelationService } from "./relation.service";

@Module({
  controllers: [],
  exports: [RelationConfigService, RelationService],
  imports: [
    HttpModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [RelationModule],
      useClass: RelationHttpModuleOptionsFactory
    })
  ],
  providers: [RelationConfigService, RelationService]
})
export class RelationModule {}

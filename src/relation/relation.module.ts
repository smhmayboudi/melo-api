import { HttpModule, Module } from "@nestjs/common";
import { RelationConfigService } from "./relation.config.service";
import { RelationService } from "./relation.service";

@Module({
  controllers: [],
  exports: [RelationConfigService, RelationService],
  imports: [HttpModule],
  providers: [RelationConfigService, RelationService]
})
export class RelationModule {}

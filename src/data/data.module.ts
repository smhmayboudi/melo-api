import { HttpModule, Module } from "@nestjs/common";
import { DataConfigService } from "./data.config.service";
import { DataHttpModuleOptionsFactory } from "./data.http.options.factory";
import { DataService } from "./data.service";

@Module({
  controllers: [],
  exports: [DataConfigService, DataService],
  imports: [
    HttpModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [DataModule],
      useClass: DataHttpModuleOptionsFactory
    })
  ],
  providers: [DataConfigService, DataService]
})
export class DataModule {}

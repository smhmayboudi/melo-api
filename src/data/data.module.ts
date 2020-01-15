import { HttpModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import config from "./data.config";
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
    }),
    ConfigModule.forFeature(config)
  ],
  providers: [DataConfigService, DataService]
})
export class DataModule {}

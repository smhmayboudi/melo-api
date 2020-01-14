import { CacheModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
// import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthCacheOptionsFactory } from "./key.cache.options.factory";
import config from "./key.config";
import { KeyConfigService } from "./key.config.service";
import { KeyController } from "./key.controller";
// import { KeyEntityRepository } from "./key.entity.repository";
import { KeyService } from "./key.service";
// import { AuthTypeOrmOptionsFactory } from "./key.typeorm.options.factory";

@Module({
  controllers: [KeyController],
  exports: [KeyConfigService, KeyService],
  imports: [
    CacheModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [KeyModule],
      useClass: AuthCacheOptionsFactory
    }),
    ConfigModule.forFeature(config)
    // TypeOrmModule.forRootAsync({
    //   // eslint-disable-next-line @typescript-eslint/no-use-before-define
    //   imports: [KeyModule],
    //   useClass: AuthTypeOrmOptionsFactory
    // }),
    // TypeOrmModule.forFeature([KeyEntityRepository])
  ],
  providers: [KeyConfigService, KeyService]
})
export class KeyModule {}

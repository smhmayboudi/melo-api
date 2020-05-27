import { CacheModule, Module, forwardRef } from "@nestjs/common";

import { AppModule } from "../app/app.module";
import { ConfigModule } from "@nestjs/config";
import { FileCacheOptionsFactory } from "./file.cache.options.factory";
import { FileConfigService } from "./file.config.service";
import { FileController } from "./file.controller";
import { FileEntityRepository } from "./file.entity.repository";
import { FileHealthIndicator } from "./file.health.indicator";
import { FileMulterOptionsFactory } from "./file.multer.options.factory";
import { FileService } from "./file.service";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import config from "./file.config";

@Module({
  controllers: [FileController],
  exports: [FileConfigService, FileHealthIndicator, FileService],
  imports: [
    forwardRef(() => AppModule),
    CacheModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [FileModule],
      useClass: FileCacheOptionsFactory,
    }),
    ConfigModule.forFeature(config),
    MulterModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [FileModule],
      useClass: FileMulterOptionsFactory,
    }),
    TypeOrmModule.forFeature([FileEntityRepository]),
  ],
  providers: [FileConfigService, FileHealthIndicator, FileService],
})
export class FileModule {}

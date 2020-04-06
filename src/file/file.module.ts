/* eslint-disable @typescript-eslint/no-use-before-define */

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
      imports: [FileModule],
      useClass: FileCacheOptionsFactory,
    }),
    ConfigModule.forFeature(config),
    MulterModule.registerAsync({
      imports: [FileModule],
      useClass: FileMulterOptionsFactory,
    }),
    TypeOrmModule.forFeature([FileEntityRepository]),
  ],
  providers: [FileConfigService, FileHealthIndicator, FileService],
})
export class FileModule {}

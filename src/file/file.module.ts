import { CacheModule, forwardRef, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppModule } from "../app.module";
import { FileCacheOptionsFactory } from "./file.cache.options.factory";
import config from "./file.config";
import { FileConfigService } from "./file.config.service";
import { FileController } from "./file.controller";
import { FileEntityRepository } from "./file.entity.repository";
import { FileMulterOptionsFactory } from "./file.multer.options.factory";
import { FileService } from "./file.service";

@Module({
  controllers: [FileController],
  exports: [FileConfigService, FileService],
  imports: [
    forwardRef(() => AppModule),
    CacheModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [FileModule],
      useClass: FileCacheOptionsFactory
    }),
    ConfigModule.forFeature(config),
    MulterModule.registerAsync({
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      imports: [FileModule],
      useClass: FileMulterOptionsFactory
    }),
    TypeOrmModule.forFeature([FileEntityRepository])
  ],
  providers: [FileConfigService, FileService]
})
export class FileModule {}
